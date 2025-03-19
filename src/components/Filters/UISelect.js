import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { formatText } from "../../utils/utils";

export default function UISelect({ id, label, value, options, handleChange }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={(itemValue) => handleChange(id, itemValue)}
        items={options.map((item) => ({
          label: formatText(item),
          value: item,
        }))}
        style={styles.picker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  // picker: {
  //   backgroundColor: 'white',
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  // },
});