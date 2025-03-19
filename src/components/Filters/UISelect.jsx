import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { formatText } from "../../utils/utils";

export default function UISelect({ id, label, value, options, handleChange }) {
  const mappedOptions = options.map((item) => ({
    label: formatText(item),
    value: item,
  }));

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={(itemValue) => handleChange(id, itemValue)}
        items={mappedOptions}
        placeholder={{ label: "Any", value: null }}
        style={{
          inputIOS: {
            color: 'black',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            backgroundColor: 'white',
          },
          inputAndroid: {
            color: 'black',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            backgroundColor: 'white',
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#8F8F8F',
  },
});