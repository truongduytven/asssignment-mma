import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { FavoriteContext } from '../contexts/FavoriteContext';
import ItemList from '../components/ItemList';

export default function FavoritePage() {
  const { favorites, setFavorites } = useContext(FavoriteContext); 
  const [modalVisible, setModalVisible] = useState(false);


  const clearFavorites = () => {
    setFavorites([]); 
    setModalVisible(false); 
  };

  const renderModal = () => (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Are you sure you want to remove all favorite products?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={clearFavorites}
            >
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 && (
        <TouchableOpacity style={styles.removeButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.removeButtonText}>Remove All</Text>
        </TouchableOpacity>
      )}

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.row}
          data={favorites}
          renderItem={({ item }) => <ItemList data={item} />} // User can click to see product details
          keyExtractor={(item) => item.id.toString()}
        />
  )
}

{ renderModal() }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#f00',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#f00',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
  },
});
