import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedAnime } from '../redux/animeSlice';
import FavButton from './SetFavButton';

const AnimeCard = ({ anime }) => {
  const dispatch = useDispatch();
  
  const handlePress = () => {
    dispatch(setSelectedAnime(anime));
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.imageContainer}>
        <Image
          source={{ uri: anime.coverImage.large }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {anime.title.english || anime.title.native}
        </Text>
        <FavButton animeInfo={anime} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    maxWidth: '50%',
  },
  imageContainer: {
    aspectRatio: 3/4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AnimeCard;