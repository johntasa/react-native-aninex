import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CrossButton from './UI/CrossButton';
import NoResults from './UI/NoResults';
// import Pagination from './UI/PaginationButtons';
import Loader from './UI/Loader';
import AnimeCard from './UI/AnimeCard';
import { formatText } from '../utils/utils';
import { useLazyQuery } from '@apollo/client';
import { GET_ANIMES } from '../api/queries';

export default function FilteredAnimes({ filters, handleClearFilters }) {
  const [GetAnimes, { loading, error, data }] = useLazyQuery(GET_ANIMES);

  useEffect(() => {
    GetAnimes({
      variables: { ...filters },
    });
  }, [filters, GetAnimes]);

  if (loading) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Loader />;

  const { media: filteredAnimes } = data.Page;
  const hasResults = filteredAnimes.length > 0;

  const getActiveFilters = () => {
    const activeFilters = [];
    if (filters.search) activeFilters.push(`Search: ${filters.search}`);
    if (filters.genre && filters.genre !== 'Any') activeFilters.push(`Genre: ${filters.genre}`);
    if (filters.seasonYear && filters.seasonYear !== 'Any') activeFilters.push(`Year: ${filters.seasonYear}`);
    if (filters.status && filters.status !== 'Any') activeFilters.push(`Status: ${formatText(filters.status)}`);
    if (filters.season && filters.season !== 'Any') activeFilters.push(`Season: ${formatText(filters.season)}`);

    return activeFilters.join(' | ');
  };

  const removeFilters = () => {
    handleClearFilters(filters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Results for:</Text>
        <Text>{getActiveFilters()}</Text>
        <CrossButton exectFunct={removeFilters} calledFrom={'filters'} />
      </View>
      {loading ? (
        <Loader />
      ) : hasResults ? (
        <>
          <FlatList
            data={filteredAnimes}
            renderItem={({ item }) => <AnimeCard anime={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
          />
          {/* {pageInfo.lastPage > 1 && <Pagination pageInfo={pageInfo} setPage={setPage} />} */}
        </>
      ) : (
        <NoResults message={'No results for your filters'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    height: 28,
  },
  headerText: {
    fontWeight: 'bold',
    marginRight: 8,
  },
});