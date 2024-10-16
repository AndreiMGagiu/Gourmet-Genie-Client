const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const APP_TOKEN = process.env.REACT_APP_SECRET_TOKEN;

export const fetchRecipes = async (ingredients) => {
  const validIngredients = ingredients.filter(ingredient => typeof ingredient === 'string');

  const ingredientString = validIngredients.join(',');

  const response = await fetch(
    `${API_BASE_URL}/recipes/search?ingredients=${encodeURIComponent(ingredientString)}`, 
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AppToken': APP_TOKEN,
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
    `${API_BASE_URL}/recipe_ingredients/${recipeId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AppToken': APP_TOKEN,
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  return await response.json();
};

export const fetchRecipeRatings = async (recipes) => {
  const ratingPromises = recipes.map(recipe => 
    fetch(`${API_BASE_URL}/recipe_ingredients/${recipe.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AppToken': APP_TOKEN,
      },
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch recipe rating');
        }
        return res.json();
      })
      .then(data => ({ id: recipe.id, averageRating: data.average_rating }))
      .catch(() => ({ id: recipe.id, averageRating: null }))
  );

  const ratings = await Promise.all(ratingPromises);
  return ratings.reduce((acc, { id, averageRating }) => {
    acc[id] = averageRating;
    return acc;
  }, {});
};
