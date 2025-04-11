import { IngredientInput } from "@/components/IngredientInput";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import RecipeCard from "@/components/RecipeCard";
import { useRecipeStore } from "@/store/useRecipeStore";

const categories = ["All", "Vegan", "Mexican", "Italian", "Asian"];

const WelcomeScreen = () => {
  const {
    selectedIngredients: ingredients,
    recipes,
    setSelectedIngredients,
    setRecipes,
  } = useRecipeStore();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [allRecipes] = useState([
    {
      name: "Spaghetti with Tomato & Basil",
      ingredients: ["Spaghetti", "Tomato", "Basil"],
      picture: require("@/assets/images/spaghetti.jpg"),
      preparationBio:
        "Boil the spaghetti and prepare a fresh tomato-basil sauce.",
      category: "Italian",
    },
    {
      name: "Grilled Chicken with Veggies",
      ingredients: ["Chicken", "Tomato", "Carrot", "Broccoli"],
      picture: require("@/assets/images/chicken.jpg"),
      preparationBio: "Grill the chicken and serve with sautéed vegetables.",
      category: "Mexican",
    },
    {
      name: "Tofu Stir Fry",
      ingredients: ["Tofu", "Broccoli", "Carrot", "Basil"],
      picture: require("@/assets/images/stir-fry.jpg"),
      preparationBio: "Stir-fry tofu with vegetables and a savory sauce.",
      category: "Vegan",
    },
  ]);

  const router = useRouter();

  const handleSearch = () => {
    Keyboard.dismiss();
    filterRecipes(ingredients, selectedCategory);
  };

  const handleLogout = () => {
    router.push("/");
  };

  const handleIngredientChange = (selected: string[]) => {
    setSelectedIngredients(selected);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterRecipes(ingredients, category);
  };

  const filterRecipes = (selectedIngredients: string[], category: string) => {
    const filtered = allRecipes.filter((recipe) => {
      const hasIngredients = selectedIngredients.every((ingredient) =>
        recipe.ingredients.includes(ingredient)
      );
      const matchesCategory =
        category === "All" || recipe.category === category;
      return hasIngredients && matchesCategory;
    });

    setRecipes(filtered);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🍳 Welcome to AI Cooker</Text>
      <Text style={styles.subtitle}>
        Type ingredients you have and get recipe ideas!
      </Text>

      <IngredientInput
        suggestions={["Chicken", "Tomato", "Basil", "Tofu", "Rice", "Pasta"]}
        onChangeSelected={handleIngredientChange}
        initialSelected={ingredients}
      />

      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryListContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleCategorySelect(category)}
              style={[
                styles.categoryPill,
                selectedCategory === category && styles.categoryPillSelected,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
      >
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              name={recipe.name}
              ingredients={recipe.ingredients}
              picture={recipe.picture}
              bio={recipe.preparationBio}
            />
          ))
        ) : (
          <Text style={styles.noResults}>No recipes found</Text>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchText}>Search Recipes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  resultsContainer: {
    paddingBottom: 150,
  },
  noResults: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 30,
  },
  searchButton: {
    backgroundColor: "#FF5722",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
  },
  searchText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#FF5722",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  categoryWrapper: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
  },
  categoryListContent: {
    paddingHorizontal: 4,
    alignItems: "center",
  },
  categoryPill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    marginRight: 10,
  },
  categoryPillSelected: {
    backgroundColor: "#FF5722",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  categoryTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },

  categoryList: {
    marginTop: 10,
    maxHeight: 50,
  },
});

export default WelcomeScreen;
