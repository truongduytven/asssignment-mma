import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { IconButton } from 'react-native-paper'

export default function ItemList({ data }) {
  const [liked, setLiked] = useState(false); // State to track if the item is liked

  const handleLikePress = () => {
    setLiked(!liked); // Toggle the liked state
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.imageStyle} source={{ uri: data.image }} resizeMode='cover'/>
      </View>
      <IconButton 
        style={styles.iconStyle} 
        icon={liked ? "heart" : "heart-outline"}  // Change icon based on the liked state
        iconColor={liked ? '#f00' : '#000'}  // Change color based on the liked state
        size={25} 
        onPress={handleLikePress}  // Toggle like state on press
      />
      <Text>{data.artName}</Text>
      <Text>{(data.limitedTimeDeal * 100)}%</Text>
    </View>
  )
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
      position: 'relative', // Ensure the container is relative
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
    iconStyle: {
      position: 'absolute', // Make the icon absolute
      top: 1,  // Adjust the top position relative to the container
      right: 5, // Adjust the right position relative to the container
      padding: 0,
      margin: 0,
    },
});
