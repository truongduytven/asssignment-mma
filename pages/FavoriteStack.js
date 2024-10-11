import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritePage from './FavoritePage';
import ProductDetails from './ProductDetails';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function FavoriteStack({ navigation, route }) {
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
                name="FavoritePage"
                component={FavoritePage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{
                    title: 'Product Details', headerTitleAlign: 'center',
                    headerRight: () => (
                        <IconButton
                            style={styles.iconStyle}
                            icon={'home'}
                            iconColor='#000'
                            size={30}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }],
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
