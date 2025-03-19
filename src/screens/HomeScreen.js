import { Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { useState, useCallback } from 'react';
import { GET_TOP_ANIMES } from "../api/queries";
import AnimeCard from "../components/AnimeCard";
import FiltersBar from "../components/Filters/FiltersBar";
import { FILTERS } from "../utils/constants";

const HomeScreen = () => {
  const [filters, setFilters] = useState(FILTERS);
  const { loading, error, data } = useQuery(GET_TOP_ANIMES, {
    variables: {
      season: "WINTER",
      seasonYear: 2025,
    },
  });

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const renderContent = () => {
    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

    const seasonAnimes = data.season.media;
    const popularAnimes = data.popular.media;

    return (
      <ScrollView style={styles.container}>
        <FiltersBar filters={filters} onFilterChange={handleFilterChange}/>
        <Text style={styles.sectionTitle}>
          POPULAR THIS SEASON
        </Text>
        <FlatList
          data={seasonAnimes}
          renderItem={({ item }) => <AnimeCard anime={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>
          ALL TIME POPULAR
        </Text>
        <FlatList
          data={popularAnimes}
          renderItem={({ item }) => <AnimeCard anime={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    );
  };

  return renderContent();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#EDF1F5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
