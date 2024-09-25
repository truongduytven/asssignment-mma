import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ItemList from '../components/ItemList';

export default function HomePage() {
  const [DataEx, setDataEx] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://65459186fe036a2fa9546e52.mockapi.io/api/v1/Data');
      const data = await response.json();
      setDataEx(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredItems = DataEx.filter(item => 
      item.artName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredItems);
  }, [searchQuery, DataEx]); // Filter data when search query or DataEx changes

  const handleFilterPress = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null);
      setFilteredData(DataEx);
    } else {
      setSelectedFilter(filter);
      if (filter === 'glassSurface') {
        setFilteredData(DataEx.filter(item => item.glassSurface));
      } else if (filter === 'Arteza') {
        setFilteredData(DataEx.filter(item => item.brand === 'Arteza'));
      }
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'glassSurface' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilterPress('glassSurface')}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === 'glassSurface' && styles.activeFilterText,
            ]}
          >
            Glass Surface
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'Arteza' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilterPress('Arteza')}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === 'Arteza' && styles.activeFilterText,
            ]}
          >
            Arteza
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredData && filteredData.map((data, index) => (
          <ItemList key={index} data={data} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'start',
    width: '100%',
    padding: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: '#e63c3c',
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});
