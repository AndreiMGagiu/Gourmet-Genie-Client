import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Users, Utensils } from 'lucide-react';
import { fetchRecipeIngredients } from '../../services/api';
import styles from './RecipeModal.module.css';

const StarRating = React.memo(({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}/5</span>
    </div>
  );
});

const IngredientItem = React.memo(({ ingredient, searchedIngredients }) => {
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

  const isPartialMatch = searchedIngredients.some(term => 
    ingredient.name.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className={`text-sm ${isPartialMatch ? 'bg-green-100 border-green-200' : 'bg-gray-100 border-gray-200'} border rounded-md p-2 shadow-sm flex justify-between items-center`}>
      <span className="font-medium">{highlightedText(ingredient.name, searchedIngredients)}</span>
      <span className="text-gray-600">
        {ingredient.quantity} {ingredient.unit}
      </span>
    </div>
  );
});

export default function RecipeModal({ isOpen, onClose, recipe, searchedIngredients = [] }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRecipeIngredients = useCallback(async () => {
    if (isOpen && recipe?.id) {
      setLoading(true);
      try {
        const data = await fetchRecipeIngredients(recipe.id);
        setRecipeDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [isOpen, recipe]);

  useEffect(() => {
    loadRecipeIngredients();
  }, [loadRecipeIngredients]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.modalOverlay}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={styles.modalContent}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{recipe?.title || 'Recipe Details'}</h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className={styles.modalBody}>
            <div className="md:w-1/2">
              {recipe?.image && (
                <div className="mb-6">
                  <img
                    src={recipe.image}
                    alt={recipe.title || 'Recipe Image'}
                    className={styles.recipeImage}
                    loading="lazy"
                  />
                </div>
              )}

              <div className={styles.recipeDetails}>
                <h3 className={styles.sectionTitle}>
                  <Utensils className="mr-2" size={20} />
                  Recipe Details
                </h3>
                <div className={styles.detailsGrid}>
                  <div>
                    <p className={styles.detailLabel}>Cook Time</p>
                    <p className={styles.detailValue}>
                      <Clock size={18} className={styles.detailIcon} />
                      {recipe.cook_time} min
                    </p>
                  </div>
                  <div>
                    <p className={styles.detailLabel}>Servings</p>
                    <p className={styles.detailValue}>
                      <Users size={18} className={styles.detailIcon} />
                      {recipe.servings}
                    </p>
                  </div>
                  <div>
                    <p className={styles.detailLabel}>Category</p>
                    <p className={styles.detailValue}>{recipeDetails?.category}</p>
                  </div>
                  <div>
                    <p className={styles.detailLabel}>Rating</p>
                    {recipeDetails?.average_rating ? (
                      <StarRating rating={Math.round(recipeDetails.average_rating)} />
                    ) : (
                      <p className="text-sm text-gray-500">No ratings yet</p>
                    )}
                  </div>
                </div>
              </div>

              {recipeDetails?.ratings && recipeDetails.ratings.length > 0 && (
                <div className={styles.ratingsSection}>
                  <h3 className={styles.sectionTitle}>User Ratings</h3>
                  <ul className={styles.ratingsList}>
                    {recipeDetails.ratings.map((rating, index) => (
                      <li key={index} className={styles.ratingItem}>
                        <span className={styles.ratingUser}>{rating.user_name}</span>
                        <StarRating rating={rating.score} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="md:w-1/2">
              {loading && (
                <div className={styles.loadingSpinner}>
                  <div className={styles.spinner}></div>
                </div>
              )}
              {error && <p className={styles.errorMessage}>{error}</p>}
              {recipeDetails && (
                <div className={styles.ingredientsSection}>
                  <div>
                    <h3 className={styles.sectionTitle}>Ingredients</h3>
                    <div className={styles.ingredientsList}>
                      <div className={styles.ingredientsGrid}>
                        {recipeDetails.ingredients.map((ingredient, index) => (
                          <IngredientItem 
                            key={index} 
                            ingredient={ingredient} 
                            searchedIngredients={searchedIngredients}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}