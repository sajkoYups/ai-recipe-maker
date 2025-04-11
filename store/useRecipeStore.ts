import { create } from "zustand";

interface Recipe {
  name: string;
  ingredients: string[];
  picture: number;
  preparationBio: string;
  category: string;
}

interface RecipeStore {
  selectedIngredients: string[];
  recipes: Recipe[];
  selectedCategory: string;
  setSelectedIngredients: (ingredients: string[]) => void;
  setRecipes: (recipes: Recipe[]) => void;
  setSelectedCategory: (category: string) => void;
  filterRecipes: (
    allRecipes: Recipe[],
    selectedIngredients: string[],
    selectedCategory: string
  ) => void;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  selectedIngredients: [],
  recipes: [],
  selectedCategory: "All",
  setSelectedIngredients: (ingredients) =>
    set({ selectedIngredients: ingredients }),
  setRecipes: (recipes) => set({ recipes }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  filterRecipes: (allRecipes, selectedIngredients, selectedCategory) => {
    let filtered = allRecipes;

    if (selectedIngredients.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedIngredients.every((ingredient) =>
          recipe.ingredients.includes(ingredient)
        )
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (recipe) => recipe.category === selectedCategory
      );
    }

    set({ recipes: filtered });
  },
}));
