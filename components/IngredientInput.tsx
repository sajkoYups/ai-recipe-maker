import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type IngredientInputProps = {
  suggestions: string[];
  onChangeSelected: (selected: string[]) => void;
  initialSelected?: string[];
};

export const IngredientInput: React.FC<IngredientInputProps> = ({
  suggestions,
  onChangeSelected,
  initialSelected,
}) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    initialSelected || []
  );

  //avoid double re-setting
  useEffect(() => {
    setSelectedIngredients(initialSelected || []);
  }, [initialSelected]);

  const handleInputChange = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = suggestions.filter(
        (item) =>
          item.toLowerCase().includes(text.toLowerCase()) &&
          !selectedIngredients.includes(item)
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    if (!selectedIngredients.includes(item)) {
      const updated = [...selectedIngredients, item];
      setSelectedIngredients(updated);
      onChangeSelected(updated);
    }
    setQuery("");
    setFilteredSuggestions([]);
  };

  const handleRemove = (item: string) => {
    const updated = selectedIngredients.filter((i) => i !== item);
    setSelectedIngredients(updated);
    onChangeSelected(updated);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type ingredient..."
        value={query}
        onChangeText={handleInputChange}
        style={styles.input}
      />
      {filteredSuggestions.length > 0 && (
        <View style={styles.dropdown}>
          {filteredSuggestions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleSelect(item)}
              style={styles.dropdownItem}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.pillsContainer}>
        {selectedIngredients.map((item) => (
          <View key={item} style={styles.pill}>
            <Text style={styles.pillText}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemove(item)}>
              <Text style={styles.remove}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 10,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    maxHeight: 150,
    marginTop: 4,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  pill: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
    alignItems: "center",
  },
  pillText: {
    marginRight: 6,
  },
  remove: {
    color: "#555",
    fontWeight: "bold",
  },
});
