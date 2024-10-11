import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './pages/HomeStack';
import { FavoriteProvider, FavoriteContext } from './contexts/FavoriteContext';
import FavoriteStack from './pages/FavoriteStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <AppWithTabs />
        <StatusBar style="auto" />
      </NavigationContainer>
    </FavoriteProvider>
  );
}

// Separate component to use context properly
function AppWithTabs() {
  const { favorites } = useContext(FavoriteContext);

  return (
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
            iconName = 'folder-heart-outline';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },

        tabBarBadge: route.name === 'Favorite' && favorites.length > 0 ? favorites.length : null,
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
        options={{
          tabBarLabel: 'Favorite list',
          tabBarBadge: favorites.length > 0 ? favorites.length : null,
        }}
      />
    </Tab.Navigator>
  );
}
