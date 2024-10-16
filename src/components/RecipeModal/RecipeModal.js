import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Star } from 'lucide-react';
import { fetchRecipeIngredients } from '../../services/api';
import IngredientList from './IngredientList';

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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{recipe?.title || 'Recipe Details'}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {recipe?.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title || 'Recipe Image'}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                )}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-600" />
                    <span className="text-sm">{recipe.cook_time} mins</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-gray-600" />
                    <span className="text-sm">{recipe.servings} servings</span>
                  </div>
                </div>
                {recipeDetails && recipeDetails.category && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Category</h3>
                    <p>{recipeDetails.category}</p>
                  </div>
                )}
                {recipeDetails && recipeDetails.ratings && recipeDetails.ratings.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Ratings</h3>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" size={20} />
                      <span className="ml-1 text-lg font-bold">{recipeDetails.average_rating.toFixed(1)}</span>
                      <span className="ml-2 text-sm text-gray-600">({recipeDetails.ratings.length} ratings)</span>
                    </div>
                    <ul className="mt-2">
                      {recipeDetails.ratings.map((rating, index) => (
                        <li key={index} className="flex items-center justify-between text-sm">
                          <span>{rating.user_name}</span>
                          <div className="flex items-center">
                            <Star className="text-yellow-400 fill-current" size={16} />
                            <span className="ml-1">{rating.score}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                {loading && (
                  <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {recipeDetails && (
                  <IngredientList 
                    ingredients={recipeDetails.ingredients}
                    searchedIngredients={searchedIngredients}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default RecipeModal;