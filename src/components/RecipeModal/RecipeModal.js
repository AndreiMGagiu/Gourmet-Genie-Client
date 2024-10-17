import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Star, ChefHat } from 'lucide-react';
import { fetchRecipeIngredients } from '../../services/api';
import IngredientList from './IngredientList';
import StarRating from './StarRating';

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
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative">
            {recipe?.image && (
              <img
                src={recipe.image}
                alt={recipe.title || 'Recipe Image'}
                className="w-full h-64 object-cover rounded-t-xl"
                loading="lazy"
              />
            )}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/70 to-transparent rounded-t-xl"></div>
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-4 left-6">
              <h2 className="text-3xl font-bold text-white mb-2">{recipe?.title || 'Recipe Details'}</h2>
              <div className="flex items-center text-white space-x-4">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{recipe.cook_time} mins</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span className="text-sm">{recipe.servings} servings</span>
                </div>
                {recipeDetails?.average_rating && (
                  <div className="flex items-center">
                    <Star size={16} className="mr-1 text-yellow-400 fill-current" />
                    <span className="text-sm">{recipeDetails.average_rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="md:w-1/2 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <ChefHat size={20} className="mr-2 text-green-500" />
                    Recipe Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Category</p>
                      <p className="text-lg font-semibold">{recipeDetails?.category || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Difficulty</p>
                      <p className="text-lg font-semibold">{recipeDetails?.difficulty || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                {recipeDetails?.ratings && recipeDetails.ratings.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <Star size={20} className="mr-2 text-yellow-400" />
                      Ratings
                    </h3>
                    <div className="space-y-2">
                      {recipeDetails.ratings.slice(0, 3).map((rating, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{rating.user_name}</span>
                          <StarRating rating={rating.score} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2 mt-6 md:mt-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <ChefHat size={20} className="mr-2 text-green-500" />
                  Ingredients
                </h3>
                {loading ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                ) : error ? (
                  <p className="text-red-500 text-sm">{error}</p>
                ) : recipeDetails ? (
                  <IngredientList 
                    ingredients={recipeDetails.ingredients}
                    searchedIngredients={searchedIngredients}
                  />
                ) : null}
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