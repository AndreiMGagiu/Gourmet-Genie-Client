import React from 'react';
import { motion } from 'framer-motion';
import styles from './RecipeList.module.css';

export default function NoRecipesFound() {
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