// src/services/api.js

export const fetchRecipes = async (ingredients) => {
  // Ensure ingredients is an array of strings
  const validIngredients = ingredients.filter(ingredient => typeof ingredient === 'string');

  // Convert the array of ingredients to a comma-separated string
  const ingredientString = validIngredients.join(',');

  const response = await fetch(
    `http://localhost:3001/api/v1/recipes/search?ingredients=${encodeURIComponent(ingredientString)}`, 
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return await response.json();
};

export const fetchRecipeIngredients = async (recipeId) => {
  const response = await fetch(
    `http://localhost:3001/api/v1/recipe_ingredients/${recipeId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  return await response.json();
};