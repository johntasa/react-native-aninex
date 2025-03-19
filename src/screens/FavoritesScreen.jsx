import React from 'react';
import { useSelector } from 'react-redux';
import AnimeModal from '../components/Modal/AnimeModal';
import NoResults from '../components/UI/NoResults';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import AnimeCard from '../components/UI/AnimeCard';

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.anime.favorites);
  const isSelectedAnime = useSelector((state) => state.anime.selectedAnime);

  return (
    <ScrollView style={styles.main}>
      {isSelectedAnime
        ? <AnimeModal/>
        : favorites.length === 0
          ? <NoResults message={"No favorite animes yet."}/>
          : <FlatList
              data={favorites}
              renderItem={({ item }) => <AnimeCard anime={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.listContainer}
              scrollEnabled={false}
            />
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    minHeight: '100%',
  },
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  noResults: {
    marginTop: 24,
  },
});