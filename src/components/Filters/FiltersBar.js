import {
    GENRES,
    STATUSES,
    YEARS,
    SEASONS
  } from "../../utils/constants";
  import UISelect from "./UISelect";
  import { View, Text, TextInput, StyleSheet } from "react-native";
  
  export default function FiltersBar({ filters, onFilterChange }) {
  
    const handleChange = (id, value) => {
      const updatedFilters = {
        ...filters,
        [id]: value,
      };
      onFilterChange(updatedFilters);
    };
  
    return (
        <View style={styles.container}>
          <View style={styles.grid}>
            <View>
              <Text style={styles.label}>Search</Text>
              <TextInput
                style={styles.input}
                placeholder="Search"
                value={filters.search || ""}
                onChangeText={(text) => handleChange('search', text)}
              />
            </View>
            <UISelect id="genre" label="Genre" options={GENRES} value={filters.genre || "Any"} handleChange={handleChange} />
            {/* <UISelect id="seasonYear" label="Year" options={YEARS} value={filters.seasonYear || "Any"} handleChange={handleChange} />
            <UISelect id="status" label="Status" options={STATUSES} value={filters.status || "Any"} handleChange={handleChange} />
            <UISelect id="season" label="Season" options={SEASONS} value={filters.season || "Any"} handleChange={handleChange} /> */}
          </View>
        </View>
      );
    }
    
const styles = StyleSheet.create({
    container: {
      marginTop: 24,
      marginBottom: 8,
    },
    grid: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    input: {
      backgroundColor: 'white',
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      width: 200,
    },
});