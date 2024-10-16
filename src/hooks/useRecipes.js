import { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/api';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isQuickRecipe, setIsQuickRecipe] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  const handleSearch = async (ingredients) => {
    setLoading(true);
    setError(null);
    setShowFilters(false);
    setIsQuickRecipe(false);
    setIsVegetarian(false);
    setIsVegan(false);
    try {
      const data = await fetchRecipes(ingredients);
      setRecipes(data.recipes);
      const hasQuickRecipes = data.recipes.some(recipe => recipe.cook_time >= 10 && recipe.cook_time <= 15);
      const hasVegetarianRecipes = data.recipes.some(recipe => recipe.title.toLowerCase().includes('vegetarian'));
      const hasVeganRecipes = data.recipes.some(recipe => recipe.title.toLowerCase().includes('vegan'));
      setShowFilters(hasQuickRecipes || hasVegetarianRecipes || hasVeganRecipes);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const applyFilters = (recipes) => {
      let filtered = recipes;
      if (isQuickRecipe) {
        filtered = filtered.filter((recipe) => recipe.cook_time <= 15 && recipe.cook_time >= 10);
      }
      if (isVegetarian) {
        filtered = filtered.filter((recipe) => recipe.title.toLowerCase().includes('vegetarian'));
      }
      if (isVegan) {
        filtered = filtered.filter((recipe) => recipe.title.toLowerCase().includes('vegan'));
      }
      return filtered;
    };

    setFilteredRecipes(applyFilters(recipes));
  }, [recipes, isQuickRecipe, isVegetarian, isVegan]);

  return {
    recipes,
    filteredRecipes,
    loading,
    error,
    showFilters,
    isQuickRecipe,
    setIsQuickRecipe,
    isVegetarian,
    setIsVegetarian,
    isVegan,
    setIsVegan,
    handleSearch
  };
}