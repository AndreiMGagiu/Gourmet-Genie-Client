import React, { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './RecipeSearch.module.css';

export default function RecipeSearch({ onSearch }) {
  const [ingredients, setIngredients] = useState('');

  const handleChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onSearch(ingredients.split(',').map(item => item.trim()).filter(Boolean));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={ingredients}
          onChange={handleChange}
          placeholder="Enter ingredients (comma separated)"
          className={styles.searchInput}
        />
        <button
          type="submit"
          className={styles.searchButton}
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}