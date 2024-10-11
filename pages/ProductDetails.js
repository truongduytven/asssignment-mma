import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { FavoriteContext } from '../contexts/FavoriteContext'; // Import the context
import AntDesign from '@expo/vector-icons/AntDesign'; // Import AntDesign for star icons

export default function ProductDetails({ route, navigation }) {
  const { product } = route.params;
  const { toggleFavorite, favorites } = useContext(FavoriteContext);

  const [ratingFilter, setRatingFilter] = useState(0); // State for filtering comments by rating

  const isLiked = favorites.some((item) => item.id === product.id);

  const discountedPrice = product.price - (product.price * product.limitedTimeDeal);

  const totalRatings = product.comments.reduce((sum, comment) => sum + comment.rating, 0);
  const averageRating = product.comments.length > 0 ? totalRatings / product.comments.length : 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= averageRating ? 'star' : 'staro'}
          size={24}
          color={i <= averageRating ? '#FFD700' : '#ccc'}
        />
      );
    }
    return stars;
  };

  const ratingCounts = product.comments.reduce((acc, comment) => {
    acc[comment.rating] = (acc[comment.rating] || 0) + 1;
    return acc;
  }, {}); 

  const handleRatingFilterChange = (rating) => {
    setRatingFilter(rating);
  };

  const filteredComments = ratingFilter === 0
    ? product.comments
    : product.comments.filter((comment) => comment.rating === ratingFilter);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Image style={styles.image} source={{ uri: product.image }} resizeMode="contain" />
        <View style={styles.content}>
          <View style={styles.artNameRow}>
            <Text style={styles.brand}>{product.brand}</Text>
            <IconButton
              style={styles.iconStyle}
              icon={isLiked ? 'heart' : 'heart-outline'}
              iconColor={isLiked ? '#f00' : '#000'}
              size={25}
              onPress={() => toggleFavorite(product)}
            />
          </View>
          <Text style={styles.title}>{product.artName}</Text>
          <Text style={styles.description}>{product.description}</Text>
          {product.limitedTimeDeal > 0 ? (
            <>
              <View style={styles.priceContainer}>
                <Text style={styles.newPrice}>${discountedPrice.toFixed(2)}</Text>
                <Text style={styles.discountTag}>{(product.limitedTimeDeal * 100)}% OFF</Text>
              </View>
              <Text style={styles.oldPrice}>${product.price.toFixed(2)}</Text>
            </>
          ) : (
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          )}
        </View>
        <View style={styles.commentRow}>
          <Text style={styles.commentsTitle}>Comments ({filteredComments.length})</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.averageRatingText}>{averageRating.toFixed(1)}</Text>
            <AntDesign name="star" size={24} color="#FFD700" />
          </View>
        </View>

        {/* Rating Filter in Horizontal ScrollView */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.ratingFilterContainer}
          showsHorizontalScrollIndicator={false}
        >
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingFilterButton,
                ratingFilter === rating && styles.activeRatingFilterButton,
              ]}
              onPress={() => handleRatingFilterChange(rating)}
            >
              <Text style={[
                styles.ratingFilterText,
                ratingFilter === rating && styles.activeRatingFilterText,
              ]}>
                {rating === 0 ? `All (${product.comments.length})` : `${rating} Stars (${ratingCounts[rating] || 0})`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View>
          {(filteredComments && filteredComments.length > 0) ? filteredComments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <View style={styles.starsRow}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <AntDesign
                    key={i}
                    name={i < comment.rating ? 'star' : 'staro'}
                    size={16}
                    color={i < comment.rating ? '#FFD700' : '#ccc'}
                  />
                ))}
              </View>
            </View>
          )) : <Text style={styles.noItemRating}>No comments found</Text>}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 22,
    color: '#f00',
  },
  newPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f00',
  },
  oldPrice: {
    fontSize: 18,
    color: '#666',
    textDecorationLine: 'line-through',
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  brand: {
    fontSize: 20,
    fontWeight: '600',
  },
  discountTag: {
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 10,
    marginLeft: 10,
    backgroundColor: "#f00"
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  iconStyle: {
    backgroundColor: '#edeff2'
  },
  artNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  commentContainer: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentContent: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  averageRatingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ratingFilterContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  ratingFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeRatingFilterButton: {
    backgroundColor: '#e63c3c',
  },
  ratingFilterText: {
    fontSize: 16,
    color: '#333',
  },
  activeRatingFilterText: {
    color: '#fff',
  },
  noItemRating: {
    marginVertical: 40,
    textAlign: 'center',
  }
});
