import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Leaf, Carrot } from 'lucide-react';
import RecipeSearch from '../RecipeSearch/RecipeSearch';
import Filter from '../Filter/Filter';
import styles from './SearchSection.module.css';

const MotionChefHat = motion(ChefHat);

export default function SearchSection({ 
  onSearch, 
  showFilters, 
  recipes, 
  isQuickRecipe, 
  setIsQuickRecipe, 
  isVegetarian, 
  setIsVegetarian, 
  isVegan, 
  setIsVegan 
}) {
  return (
    <div className={`${styles.container} ${recipes.length === 0 ? '' : styles.containerWithRecipes}`}>
      <div className={styles.searchBox}>
        {recipes.length === 0 && (
          <>
            <h2 className={styles.searchTitle}>
              <MotionChefHat 
                className="mr-2" 
                size={20}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              Find Recipes with Your Ingredients
            </h2>
            <p className={styles.searchDescription}>
              Tell us what's in your kitchen, and we'll conjure up delicious recipes tailored just for you!
            </p>
          </>
        )}
        <div className={styles.filterContainer}>
          <div className={styles.searchInputContainer}>
            <RecipeSearch onSearch={onSearch} />
          </div>
          {showFilters && (
            <>
              <Filter 
                isQuickRecipe={isQuickRecipe}
                setIsQuickRecipe={setIsQuickRecipe}
              />
              <button
                onClick={() => setIsVegetarian(!isVegetarian)}
                className={`${styles.filterButton} ${isVegetarian ? styles.filterButtonActive : styles.filterButtonInactive}`}
              >
                <Leaf size={16} className="mr-1" />
                Vegetarian
              </button>
              <button
                onClick={() => setIsVegan(!isVegan)}
                className={`${styles.filterButton} ${isVegan ? styles.filterButtonActive : styles.filterButtonInactive}`}
              >
                <Carrot size={16} className="mr-1" />
                Vegan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}