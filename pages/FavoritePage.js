import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FavoriteContext } from '../contexts/FavoriteContext';
import ItemList from '../components/ItemList';

export default function FavoritePage() {
  const { favorites } = useContext(FavoriteContext);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => <ItemList data={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
});
