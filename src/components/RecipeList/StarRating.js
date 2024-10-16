import React from 'react';
import { Star } from 'lucide-react';
import styles from './RecipeList.module.css';

export default function StarRating({ rating }) {
  const numericRating = parseFloat(rating);
  if (isNaN(numericRating)) {
    return <span className={styles.noRating}>No rating</span>;
  }
  return (
    <div className={styles.starRating}>
      <Star size={12} className="text-yellow-400 fill-current" />
      <span className="ml-1 text-xs text-gray-600">{numericRating.toFixed(1)}</span>
    </div>
  );
}