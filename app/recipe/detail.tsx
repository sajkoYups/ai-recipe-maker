import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const RecipeDetailScreen = () => {
  const { recipe } = useLocalSearchParams();
  const router = useRouter();

  if (!recipe || typeof recipe !== "string") {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Recipe not found</Text>
      </View>
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(recipe);
  } catch {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to parse recipe data</Text>
      </View>
    );
  }

  const { name, ingredients, picture, bio } = parsed;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Image source={picture} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      <Text style={styles.text}>{ingredients.join(", ")}</Text>
      <Text style={styles.sectionTitle}>About this recipe:</Text>
      <Text style={styles.text}>{bio}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: "#444",
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#FF5722",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#999",
  },
});

export default RecipeDetailScreen;
