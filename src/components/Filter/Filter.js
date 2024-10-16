import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import styles from './Filter.module.css';

export default function Filter({ isQuickRecipe, setIsQuickRecipe }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsQuickRecipe(!isQuickRecipe)}
        className={`${styles.filterButton} ${
          isQuickRecipe ? styles.filterButtonActive : styles.filterButtonInactive
        }`}
      >
        <Clock size={18} className="mr-2" />
        Quick Recipes
      </button>
    </motion.div>
  );
}