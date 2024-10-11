import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import ProductDetails from './ProductDetails';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

export default function HomeStack({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'ProductDetails') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          title: 'Product Detail', headerTitleAlign: 'center', headerRight: () => (
            <IconButton
              style={styles.iconStyle}
              icon={'folder-heart-outline'}
              iconColor='#f00'
              size={30}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Favorite' }],
                }); 
              }}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  iconStyle: {
    backgroundColor: '#fff'
  },
})