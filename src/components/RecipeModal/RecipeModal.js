import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { fetchRecipeIngredients } from '../../services/api';
import StarRating from './StarRating';
import IngredientList from './IngredientList';
import RecipeDetails from './RecipeDetails';
import styles from './RecipeModal.module.css';

const RecipeModal = ({ isOpen, onClose, recipe, searchedIngredients = [] }) => {
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
        setError(err.message || 'An error occurred');
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
            <button onClick={onClose} className={styles.closeButton}>
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

              <RecipeDetails recipe={recipe} recipeDetails={recipeDetails} />

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
                <IngredientList 
                  ingredients={recipeDetails.ingredients}
                  searchedIngredients={searchedIngredients}
                />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default RecipeModal;