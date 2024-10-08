import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './pages/HomeStack';
import { FavoriteProvider } from './contexts/FavoriteContext';
import FavoriteStack from './pages/FavoriteStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: true,
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: [{ display: 'flex' }, null],
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Favorite') {
                iconName = 'heart';
              }

              return <Icon name={iconName} color={color} size={size} />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ tabBarLabel: 'Home' }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteStack}
            options={{ tabBarLabel: 'Favorite list' }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </FavoriteProvider>
  );
}
