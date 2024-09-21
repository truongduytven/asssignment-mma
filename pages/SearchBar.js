import React from 'react'
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper'

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <Searchbar 
        style={styles.container}
        placeholder='Search...'
        onChangeText={setSearchQuery}
        value={searchQuery}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15
  }
})
