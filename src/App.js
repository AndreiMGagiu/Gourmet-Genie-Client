// App.js
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import SearchSection from './components/SearchSection/SearchSection';
import RecipeSection from './components/RecipeSection/RecipeSection';
import GourmetGenieLogo from './components/GourmetGenieLogo';
import { fetchRecipes } from './services/api';

export default function App() {
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
    setFilteredRecipes(filtered);
  }, [recipes, isQuickRecipe, isVegetarian, isVegan]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans antialiased">
      <NavBar />
      <div className="flex-grow relative">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="absolute bottom-0 right-0 pointer-events-none">
          <GourmetGenieLogo className="w-64 h-64 opacity-5" />
        </div>
        <main className="container mx-auto px-4 py-6 relative z-10 flex flex-col min-h-[calc(100vh-4rem)]">
          <div className={`flex-grow flex flex-col ${recipes.length === 0 ? 'justify-center' : ''}`}>
            {recipes.length === 0 && <Header />}
            <SearchSection 
              onSearch={handleSearch} 
              showFilters={showFilters} 
              recipes={recipes}
              isQuickRecipe={isQuickRecipe}
              setIsQuickRecipe={setIsQuickRecipe}
              isVegetarian={isVegetarian}
              setIsVegetarian={setIsVegetarian}
              isVegan={isVegan}
              setIsVegan={setIsVegan}
            />
            <RecipeSection 
              recipes={filteredRecipes} 
              loading={loading} 
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
}