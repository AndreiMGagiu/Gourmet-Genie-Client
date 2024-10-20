import { useState, useEffect, useCallback } from 'react';
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
  const [searchedIngredients, setSearchedIngredients] = useState([]);

  const handleSearch = useCallback(async (ingredients) => {
    setLoading(true);
    setError(null);
    setShowFilters(false);
    setIsQuickRecipe(false);
    setIsVegetarian(false);
    setIsVegan(false);
    setSearchedIngredients(ingredients);
    try {
      const data = await fetchRecipes(ingredients);
      setRecipes(data.recipes);
      setFilteredRecipes(data.recipes);
      const hasQuickRecipes = data.recipes.some(recipe => recipe.cook_time >= 10 && recipe.cook_time <= 15);
      const hasVegetarianRecipes = data.recipes.some(recipe => recipe.dietary_requirements.includes('Vegetarian'));
      const hasVeganRecipes = data.recipes.some(recipe => recipe.dietary_requirements.includes('Vegan'));
      setShowFilters(hasQuickRecipes || hasVegetarianRecipes || hasVeganRecipes);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let filtered = recipes;
    if (isQuickRecipe) {
      filtered = filtered.filter((recipe) => recipe.cook_time <= 15 && recipe.cook_time >= 10);
    }
    if (isVegetarian) {
      filtered = filtered.filter((recipe) => recipe.dietary_requirements.includes('Vegetarian'));
    }
    if (isVegan) {
      filtered = filtered.filter((recipe) => recipe.dietary_requirements.includes('Vegan'));
    }
    setFilteredRecipes(filtered);
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
    handleSearch,
    searchedIngredients
  };
}