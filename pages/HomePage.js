import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SearchBar from './SearchBar';
import ItemList from '../components/ItemList';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function HomePage() {
  const navigation = useNavigation();
  const [DataEx, setDataEx] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedFilter('all');
      setSearchQuery('');
      setFilteredData(DataEx);
      return () => { };
    }, [DataEx])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://65459186fe036a2fa9546e52.mockapi.io/api/v1/Data');
        const data = await response.json();
        setDataEx(data);
        setFilteredData(data);
        extractUniqueBrands(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    const filterData = () => {
      let dataToFilter = DataEx;

      // Apply filter based on selectedFilter
      if (selectedFilter !== 'all') {
        dataToFilter = dataToFilter.filter(item =>
          selectedFilter === 'glassSurface' ? item.glassSurface : item.brand === selectedFilter
        );
      }
      // Apply search query if present
      if (debouncedSearchQuery !== '') {
        dataToFilter = dataToFilter.filter(item =>
          item.artName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }

      setFilteredData(dataToFilter);
    };

    filterData();
  }, [debouncedSearchQuery, selectedFilter, DataEx]);


  const extractUniqueBrands = (data) => {
    const brands = data.map(item => item.brand);
    const uniqueBrands = Array.from(new Set(brands));
    setUniqueBrands(uniqueBrands);
  };

  const handleFilterPress = (filter) => {
    if (selectedFilter === filter || filter === 'all') {
      setSelectedFilter('all');
      setFilteredData(DataEx);
    } else {
      setSelectedFilter(filter);
      setFilteredData(DataEx.filter(item => {
        if (filter === 'glassSurface') {
          return item.glassSurface;
        } else {
          return item.brand === filter;
        }
      }));
    }
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product });
    setShowSuggestions(false);
  };

  const handleTouchOutside = () => {
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f00530" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleTouchOutside}>
      <View style={styles.container}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFocus={() => setShowSuggestions(true)}
        />

        {showSuggestions && searchQuery !== "" && filteredData.length > 0 && (
          <ScrollView style={styles.suggestionsContainer} showsHorizontalScrollIndicator={false}>
            {filteredData.slice(0, 5).map((suggestion, index) => (
              <TouchableOpacity key={index} onPress={() => handleProductPress(suggestion)} style={styles.suggestionItem}>
                <Image source={{ uri: suggestion.image }} style={styles.suggestionImage} />
                <Text style={styles.suggestionText}>{suggestion.artName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.scrollContainer}>
          <ScrollView horizontal contentContainerStyle={styles.filterRow} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'all' && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterPress('all')}
            >
              <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'glassSurface' && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterPress('glassSurface')}
            >
              <Text style={[styles.filterText, selectedFilter === 'glassSurface' && styles.activeFilterText]}>
                Glass Surface
              </Text>
            </TouchableOpacity>

            {uniqueBrands.map((brand, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterButton,
                  selectedFilter === brand && styles.activeFilterButton,
                ]}
                onPress={() => handleFilterPress(brand)}
              >
                <Text style={[styles.filterText, selectedFilter === brand && styles.activeFilterText]}>
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
          {(filteredData && filteredData.length > 0) ? filteredData.map((data, index) => (
            <ItemList key={index} data={data} onPress={() => handleProductPress(data)} />
          )) : <Text style={styles.textNoItems}>No items found</Text>}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    width: '100%',
    paddingVertical: 0
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    paddingHorizontal: 10,
  },
  textNoItems: {
    fontSize: 20,
    color: '#666',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 75,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    maxHeight: 250,
    borderRadius: 5,
    zIndex: 10,
    elevation: 5,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  suggestionText: {
    fontSize: 16,
    paddingLeft: 10,
  },
  suggestionImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});
