import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'react-native-feather';

export default function CrossButton({ exectFunct, calledFrom }) {
  return (
    <TouchableOpacity
      onPress={exectFunct}
      style={[
        styles.button,
        calledFrom === 'filters' && styles.filtersButton
      ]}
      accessibilityLabel={`Close ${calledFrom} section`}
    >
      <X style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#008080', // teal color
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersButton: {
    position: 'static',
    height: 28,
    width: 28,
  },
  icon: {
    height: 28,
    width: 28,
    color: '#fff',
  },
});