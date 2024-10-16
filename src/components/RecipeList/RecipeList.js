import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import RecipeModal from '../RecipeModal/RecipeModal';
import NoRecipesFound from './NoRecipesFound';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';

const RECIPES_PER_PAGE = 18;

const RecipeList = ({ recipes, searchedIngredients }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  if (recipes.length === 0 && !loading) {
    return <NoRecipesFound />;
  }

  const indexOfLastRecipe = currentPage * RECIPES_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - RECIPES_PER_PAGE;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 h-[calc(100vh-200px)] flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4 overflow-y-auto flex-grow">
        {currentRecipes.map((recipe) => (
          <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)} className="cursor-pointer">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          page={currentPage}
          onPageChange={paginate}
          totalRecipes={recipes.length}
          recipesPerPage={RECIPES_PER_PAGE}
        />
      </div>
      <RecipeModal
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe}
        searchedIngredients={searchedIngredients}
      />
    </div>
  );
};

export default RecipeList;