import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAnime } from '../../redux/animeSlice';
import AnimeDetails from './AnimeDetails';
import FavButton from '../UI/FavButton';
import CrossButton from '../UI/CrossButton';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function AnimeModal() {
  const dispatch = useDispatch();

  const selectedAnime = useSelector((state) => {
    const anime = state.anime.selectedAnime;
    if (!anime) {
      throw new Error("AnimeModal should not be rendered when selectedAnime is null");
    }
    return anime;
  });

  const cleanDescription = selectedAnime?.description.replace(/<[^>]*>?/gm, "") || "";
  const handleClose = () => dispatch(setSelectedAnime(null));

  const openYouTube = () => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${selectedAnime.trailer.id}`;
    Linking.openURL(youtubeUrl).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.modal}>
      <View style={styles.modalContent}>
        <Image 
          style={styles.bannerImage}
          source={{ uri: selectedAnime.bannerImage || "/Background.png" }}
          resizeMode="cover"
        />
        <CrossButton exectFunct={handleClose} calledFrom={"modal"} />
        <ScrollView style={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{selectedAnime.title.english}</Text>
            <Text style={styles.subtitle}>{selectedAnime.title.native}</Text>
            <FavButton animeInfo={selectedAnime} size={50} />
          </View>
          <Text style={styles.description}>{cleanDescription}</Text>
          <AnimeDetails animeInfo={selectedAnime} />
          {selectedAnime.trailer && (
            <View style={styles.trailer}>
              <TouchableOpacity onPress={openYouTube}>
                <Text style={styles.linkText}>Watch Trailer on YouTube</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10000,
    height: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 160,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#282828',
  },
  subtitle: {
    fontSize: 20,
    color: '#282828',
  },
  description: {
    marginVertical: 8,
    fontSize: 14,
    textAlign: 'justify',
    color: '#282828',
  },
  trailer: {
    justifyContent: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});