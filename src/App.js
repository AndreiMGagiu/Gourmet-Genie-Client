import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import SearchSection from './components/SearchSection/SearchSection';
import RecipeList from './components/RecipeList/RecipeList';
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

  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchWrapper = (...args) => {
    setHasSearched(true);  // Trigger search state
    handleSearch(...args);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans antialiased">
      <NavBar />
      <div className="flex-grow relative">
        <main className="container mx-auto px-4 relative z-10 flex flex-col min-h-[calc(100vh-4rem)]">
          <div className={`flex-grow flex flex-col ${!hasSearched ? 'justify-center' : ''}`}>
            {!hasSearched && <Header />}  {/* Show header before search */}
            <div className={`${hasSearched ? 'pt-4' : ''}`}>
              <SearchSection 
                onSearch={handleSearchWrapper} 
                showFilters={showFilters} 
                recipes={recipes}
                isQuickRecipe={isQuickRecipe}
                setIsQuickRecipe={setIsQuickRecipe}
                isVegetarian={isVegetarian}
                setIsVegetarian={setIsVegetarian}
                isVegan={isVegan}
                setIsVegan={setIsVegan}
              />
            </div>
            {loading ? (
              <div className="text-center mt-8">Loading...</div>
            ) : error ? (
              <div className="text-center mt-8 text-red-500">{error}</div>
            ) : (
              hasSearched && (
                <div className="mt-6">
                  <RecipeList 
                    recipes={filteredRecipes} 
                    searchedIngredients={searchedIngredients}
                  />
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
