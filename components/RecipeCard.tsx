import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface RecipeCardProps {
  name: string;
  ingredients: string[];
  picture: number;
  bio: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  ingredients,
  picture,
  bio,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/recipe/detail",
          params: {
            recipe: JSON.stringify({ name, ingredients, picture, bio }),
          },
        })
      }
    >
      <View style={styles.card}>
        <Image source={picture} style={styles.image} />
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardText}>
          Ingredients: {ingredients.join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default RecipeCard;
