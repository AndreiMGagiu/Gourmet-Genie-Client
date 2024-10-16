import React from 'react';
import stringSimilarity from 'string-similarity';

const highlightedText = (text, searchTerms) => {
  if (!searchTerms.length) return text;

  let highlighted = text;
  
  searchTerms.forEach(term => {
    const lowerText = text.toLowerCase();
    const lowerTerm = term.toLowerCase();
    const similarity = stringSimilarity.compareTwoStrings(lowerText, lowerTerm);
    if (similarity > 0.5) {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(
        regex, 
        `<span class="bg-yellow-200">$1</span>`
      );
    }
  });

  return highlighted;
};

const IngredientList = ({ ingredients, searchedIngredients }) => (
  <div className="mt-4">
    <div className="flex font-semibold mb-2 text-sm">
      <span className="w-1/3">Quantity</span>
      <span className="w-2/3">Ingredients</span>
    </div>
    <ul className="space-y-1">
      {ingredients.map((ingredient, index) => {
        const isPartialMatch = searchedIngredients.some(term => 
          stringSimilarity.compareTwoStrings(ingredient.name.toLowerCase(), term.toLowerCase()) > 0.5
        );
        return (
          <li 
            key={index}
            className="text-xs bg-gray-50 rounded-md p-2 shadow-sm flex items-center"
          >
            <span className="w-1/3 font-medium">
              {ingredient.quantity} {ingredient.unit}
            </span>
            <span className="w-2/3 flex items-center">
              <span 
                dangerouslySetInnerHTML={{ __html: highlightedText(ingredient.name, searchedIngredients) }}
              />
              {isPartialMatch && <span className="ml-1">✅</span>}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

export default IngredientList;
