import React from 'react';
import { Clock, Users, Utensils } from 'lucide-react';
import StarRating from './StarRating';
import styles from './RecipeModal.module.css';

const RecipeDetails = ({ recipe, recipeDetails }) => (
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
);

export default RecipeDetails;