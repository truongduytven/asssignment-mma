import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a Context for managing the liked products
export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites from storage', error);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites to storage', error);
      }
    };
    saveFavorites();
  }, [favorites]);

  // Function to add or remove a product from favorites
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === product.id)) {
        // If product is already liked, remove it
        return prevFavorites.filter((fav) => fav.id !== product.id);
      } else {
        // Otherwise, add it to the liked products
        return [...prevFavorites, product];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
