import React from 'react';
import { Clock, Users } from 'lucide-react';
import OptimizedImage from '../Image/OptimizedImage';
import styles from './RecipeList.module.css';

const getCookTimeColor = (cookTime) => {
  if (cookTime >= 10 && cookTime <= 15) return 'text-green-600';
  if (cookTime > 15 && cookTime <= 40) return 'text-orange-500';
  if (cookTime > 40) return 'text-red-500';
  return 'text-gray-600';
};

const RecipeCard = ({ recipe }) => {
  return (
    <div className={styles.recipeCard}>
      <div className={styles.imageWrapper}>
        <OptimizedImage
          src={recipe.image}
          alt={recipe.title}
          className={styles.recipeImage}
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
      </div>
    </div>
  );
};

export default RecipeCard;