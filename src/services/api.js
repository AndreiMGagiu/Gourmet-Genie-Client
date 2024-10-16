const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const APP_TOKEN = process.env.REACT_APP_SECRET_TOKEN;

const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'AppToken': APP_TOKEN,
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

export const fetchRecipes = async (ingredients) => {
  const validIngredients = ingredients.filter(ingredient => typeof ingredient === 'string');
  const ingredientString = validIngredients.join(',');

  return fetchWithAuth(
    `${API_BASE_URL}/recipes/search?ingredients=${encodeURIComponent(ingredientString)}`
  );
};

export const fetchRecipeIngredients = async (recipeId) => {
  return fetchWithAuth(`${API_BASE_URL}/recipe_ingredients/${recipeId}`);
};

export const fetchRecipeRatings = async (recipes) => {
  const recipeIds = recipes.map(recipe => recipe.id).join(',');
  try {
    const ratings = await fetchWithAuth(`${API_BASE_URL}/recipe_ratings?ids=${recipeIds}`);
    return ratings.reduce((acc, { id, average_rating }) => {
      acc[id] = average_rating;
      return acc;
    }, {});
  } catch (error) {
    console.error('Failed to fetch recipe ratings:', error);
    return {};
  }
};