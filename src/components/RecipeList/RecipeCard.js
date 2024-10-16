import React from 'react';
import { Clock, Users } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import StarRating from './StarRating';
import styles from './RecipeList.module.css';

const getCookTimeColor = (cookTime) => {
  if (cookTime >= 10 && cookTime <= 15) return 'text-green-600';
  if (cookTime > 15 && cookTime <= 40) return 'text-orange-500';
  if (cookTime > 40) return 'text-red-500';
  return 'text-gray-600';
};

export default function RecipeCard({ recipe, rating }) {
  return (
    <div className={styles.recipeCard}>
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
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
}