import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { FavoriteContext } from '../contexts/FavoriteContext';

export default function ItemList({ data }) {
  const { toggleFavorite, favorites } = useContext(FavoriteContext);
  const navigation = useNavigation();

  const isLiked = favorites.some((item) => item.id === data.id);

  const handlePress = () => {
    navigation.navigate('ProductDetails', { product: data });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageWrapper}>
        <Image style={styles.imageStyle} source={{ uri: data.image }} resizeMode="cover" />
      </View>
      <View style={styles.headerRow}>
        {data.limitedTimeDeal > 0 ? 
        <Text style={styles.timeDeal}>-{(data.limitedTimeDeal * 100)}%</Text> 
        : <Text> </Text>}
        <IconButton
          style={styles.iconStyle}
          icon={isLiked ? 'heart' : 'heart-outline'}
          iconColor={isLiked ? '#f00' : '#000'}
          size={25}
          onPress={() => toggleFavorite(data)}
        />
      </View>
      <Text>{data.artName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '45%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 5,
    padding: 10,
    height: 300,
    alignItems: 'center',
    shadowColor: '#c9c5b9',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    position: 'relative',
  },
  imageWrapper: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  headerRow: {
    position: 'absolute',
    top: 5,
    left: 5, 
    right: 5, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 0,
    margin: 0,
  },
  timeDeal: {
    backgroundColor: '#f00',
    color: "#fff",
    paddingHorizontal: 10,
  }
});
