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
  <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
    <ul className="space-y-2">
      {ingredients.map((ingredient, index) => {
        const isPartialMatch = searchedIngredients.some(term => 
          stringSimilarity.compareTwoStrings(ingredient.name.toLowerCase(), term.toLowerCase()) > 0.5
        );
        return (
          <li 
            key={index}
            className="flex items-center justify-between text-sm bg-white rounded-md p-2 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <span className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">{ingredient.quantity} {ingredient.unit}</span>
              <span 
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: highlightedText(ingredient.name, searchedIngredients) }}
              />
            </span>
            {isPartialMatch && (
              <span className="text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

export default IngredientList;