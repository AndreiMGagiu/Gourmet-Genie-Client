import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import RecipeList from '../RecipeList/RecipeList';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import styles from './RecipeSection.module.css';

export default function RecipeSection({ recipes, loading, error }) {
  const [page, setPage] = useState(1);
  const recipesPerPage = 12;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedRecipes = recipes.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <p className={styles.errorMessage}>
        {error}
      </p>
    );
  }

  if (recipes.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.recipeBox}>
        <h3 className={styles.recipeTitle}>
          <Clock className="mr-2" size={20} />
          Recipe Suggestions
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="ml-2"
          >
            <Sparkles size={16} className="text-yellow-400" />
          </motion.div>
        </h3>
        <RecipeList recipes={paginatedRecipes} />
      </div>
      {recipes.length > recipesPerPage && (
        <div className={styles.paginationContainer}>
          <Pagination
            page={page}
            onPageChange={handlePageChange}
            totalRecipes={recipes.length}
            recipesPerPage={recipesPerPage}
          />
        </div>
      )}
    </div>
  );
}