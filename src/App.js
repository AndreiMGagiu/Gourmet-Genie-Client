import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import SearchSection from './components/SearchSection/SearchSection';
import RecipeList from './components/RecipeList/RecipeList';
import BackgroundElements from './components/BackgroundElements/BackgroundElements';
import { useRecipes } from './hooks/useRecipes';

export default function App() {
  const {
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
  } = useRecipes();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans antialiased">
      <NavBar />
      <div className="flex-grow relative">
        <BackgroundElements />
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
            {loading ? (
              <div className="text-center mt-8">Loading...</div>
            ) : error ? (
              <div className="text-center mt-8 text-red-500">{error}</div>
            ) : (
              <RecipeList 
                recipes={filteredRecipes} 
                searchedIngredients={searchedIngredients}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}