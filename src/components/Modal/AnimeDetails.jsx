import React from 'react';
import DetailItem from './DetailItem';
import { formatText, formatDate } from '../../utils/utils'
import { View, StyleSheet } from 'react-native';

export default function AnimeDetails({ animeInfo }) {
  return (
    <View style={styles.detailsGrid}>
      <DetailItem label="Episodes" value={animeInfo.episodes || "N/A"} />
      <DetailItem label="Average Score" value={`${animeInfo.averageScore || "N/A"}%`} />
      <DetailItem label="Status" value={formatText(animeInfo.status)} />
      <DetailItem label="Start Date" value={formatDate(animeInfo.startDate)} />
      <DetailItem label="End Date" value={formatDate(animeInfo.endDate)} />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});