import { View, Text, SectionList, FlatList, StyleSheet } from "react-native";
// import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_TOP_ANIMES } from "../api/queries";
import AnimeCard from "../components/AnimeCard";
// import FilterBar from "../components/Filters/FiltersBar";

const HomeScreen = () => {
  // const { filters, filteredAnimes } = useSelector((state) => state.anime);
  const { loading, error, data } = useQuery(GET_TOP_ANIMES, {
    variables: {
      season: "WINTER",
      seasonYear: 2025,
    },
  });

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error)
    return <Text style={styles.errorText}>Error: {error.message}</Text>;

  const seasonAnimes = data.season.media;
  const popularAnimes = data.popular.media;
  
  return (
    <View style={styles.container}>
      {/* <FilterBar /> */}
      
      {/* <SectionList
        renderItem={({ item }) => <AnimeCard anime={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        sections={[
          {
            title: "POPULAR THIS SEASON",
            data: seasonAnimes,
          },
          {
            title: "ALL TIME POPULAR",
            data: popularAnimes,
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      /> */}

      <Text style={styles.sectionTitle}>
        POPULAR THIS SEASON
      </Text>
      <FlatList
        data={seasonAnimes}
        renderItem={({ item }) => <AnimeCard anime={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
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
      />
    </View>
  );
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
