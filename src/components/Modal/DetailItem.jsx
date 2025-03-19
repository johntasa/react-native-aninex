import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailItem({ label, value }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailItem: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  value: {
    color: '#6a6a6a',
  },
});