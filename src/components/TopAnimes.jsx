import { useQuery } from "@apollo/client";
import { GET_TOP_ANIMES } from "../api/queries";
import AnimeCard from "./UI/AnimeCard";
import {
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import Loader from "../components/UI/Loader";

const TopAnimes = () => {
  const { loading, error, data } = useQuery(GET_TOP_ANIMES, {
    variables: {
      season: "WINTER",
      seasonYear: 2025,
    },
  });

  if (loading) return <Loader />;
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  const seasonAnimes = data.season.media;
  const popularAnimes = data.popular.media;

  return (
    <>
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
    </>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#8F8F8F",
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

export default TopAnimes;