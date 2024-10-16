import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import RecipeModal from '../RecipeModal/RecipeModal';
import styles from './RecipeList.module.css';

const getCookTimeColor = (cookTime) => {
  if (cookTime >= 10 && cookTime <= 15) return 'text-green-600';
  if (cookTime > 15 && cookTime <= 40) return 'text-orange-500';
  if (cookTime > 40) return 'text-red-500';
  return 'text-gray-600';
};

const StarRating = ({ rating }) => {
  const numericRating = parseFloat(rating);
  if (isNaN(numericRating)) {
    return <span className={styles.noRating}>No rating</span>;
  }
  return (
    <div className={styles.starRating}>
      <Star size={12} className="text-yellow-400 fill-current" />
      <span className="ml-1 text-xs text-gray-600">{numericRating.toFixed(1)}</span>
    </div>
  );
};

export default function RecipeList({ recipes, searchedIngredients }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeRatings, setRecipeRatings] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingPromises = recipes.map(recipe => 
        fetch(`http://localhost:3001/api/v1/recipe_ingredients/${recipe.id}`)
          .then(res => res.json())
          .then(data => ({ id: recipe.id, averageRating: data.average_rating }))
          .catch(() => ({ id: recipe.id, averageRating: null })) // Handle potential fetch errors
      );
      const ratings = await Promise.all(ratingPromises);
      const ratingsObject = ratings.reduce((acc, { id, averageRating }) => {
        acc[id] = averageRating;
        return acc;
      }, {});
      setRecipeRatings(ratingsObject);
    };

    fetchRatings();
  }, [recipes]);

  if (recipes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.noRecipes}
      >
        <p className={styles.noRecipesText}>No recipes found.</p>
        <p className={styles.noRecipesSubtext}>Try different ingredients or adjust your filters.</p>
      </motion.div>
    );
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
            className={styles.recipeCard}
            onClick={() => setSelectedRecipe(recipe)}
          >
            <div className={styles.imageWrapper}>
              <LazyLoadImage
                alt={recipe.title}
                src={recipe.image}
                effect="blur"
                className={styles.recipeImage}
                wrapperClassName="absolute top-0 left-0 w-full h-full"
                placeholder={<div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse" />}
              />
            </div>
            <div className={styles.recipeInfo}>
              <h2 className={styles.recipeTitle}>{recipe.title}</h2>
              <div className={styles.recipeDetails}>
                <div className={styles.cookTime}>
                  <Clock size={10} className="mr-1" />
                  <span className={`font-medium ${getCookTimeColor(recipe.cook_time)}`}>
                    {recipe.cook_time}m
                  </span>
                </div>
                <div className={styles.servings}>
                  <Users size={10} className="mr-1" />
                  <span>{recipe.servings}</span>
                </div>
              </div>
              <div className="mt-1">
                <StarRating rating={recipeRatings[recipe.id]} />
              </div>
            </div>
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