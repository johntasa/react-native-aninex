import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NoResults({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 64,
  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    color: '#8F8F8F',
  },
});