import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RecipeCard from './RecipeCard';
import RecipeModal from '../RecipeModal/RecipeModal';
import NoRecipesFound from './NoRecipesFound';
import { fetchRecipeRatings } from '../../services/api';
export default function RecipeList({ recipes, searchedIngredients }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeRatings, setRecipeRatings] = useState({});

  useEffect(() => {
    fetchRecipeRatings(recipes).then(setRecipeRatings);
  }, [recipes]);

  if (recipes.length === 0) {
    return <NoRecipesFound />;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => setSelectedRecipe(recipe)}
          >
            <RecipeCard
              recipe={recipe}
              rating={recipeRatings[recipe.id]}
            />
          </motion.div>
        ))}
      </div>
      <RecipeModal
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe}
        searchedIngredients={searchedIngredients}
      />
    </>
  );
}