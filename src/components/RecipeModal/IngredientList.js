import React from 'react';
import styles from './RecipeModal.module.css';

const highlightedText = (text, searchTerms) => {
  if (!searchTerms.length) return text;
  const regex = new RegExp(`(${searchTerms.join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) => 
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200">{part}</span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const IngredientList = ({ ingredients, searchedIngredients }) => (
  <div className={styles.ingredientsSection}>
    <h3 className={styles.sectionTitle}>Ingredients</h3>
    <div className={styles.ingredientsList}>
      <div className={styles.ingredientsGrid}>
        {ingredients.map((ingredient, index) => {
          const isPartialMatch = searchedIngredients.some(term => 
            ingredient.name.toLowerCase().includes(term.toLowerCase())
          );
          return (
            <div 
              key={index}
              className={`text-sm ${isPartialMatch ? 'bg-green-100 border-green-200' : 'bg-gray-100 border-gray-200'} border rounded-md p-2 shadow-sm flex justify-between items-center`}
            >
              <span className="font-medium">
                {highlightedText(ingredient.name, searchedIngredients)}
              </span>
              <span className="text-gray-600">
                {ingredient.quantity} {ingredient.unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default IngredientList;