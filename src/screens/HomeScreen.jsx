import { StyleSheet, ScrollView } from "react-native";
import AnimeModal from "../components/Modal/AnimeModal";
import TopAnimes from "../components/TopAnimes";
import { useSelector } from 'react-redux';
import { FILTERS } from "../utils/constants";
import React, { useCallback, useState } from "react";
import FiltersBar from "../components/Filters/FiltersBar";
import FilteredAnimes from "../components/FilteredAnimes";

const HomeScreen = () => {
  const [filters, setFilters] = useState(FILTERS);
  const isSelectedAnime = useSelector((state) => state.anime.selectedAnime)

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(FILTERS);
  }, []);
  
  return (
    <ScrollView style={styles.container} scrollEnabled={!isSelectedAnime}>
      
      {isSelectedAnime
        ? <AnimeModal />
        : <>
          <FiltersBar filters={filters} onFilterChange={handleFilterChange} />
          {
            Object.values(filters).filter(value => value !== undefined).length > 0
              ? <FilteredAnimes filters={filters} handleClearFilters={handleClearFilters}/>
              : <TopAnimes />
          }
        </>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 12,
    backgroundColor: "#EDF1F5",
  },
});

export default HomeScreen;
