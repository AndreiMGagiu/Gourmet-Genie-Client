import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Leaf, Carrot } from 'lucide-react';
import RecipeSearch from '../RecipeSearch/RecipeSearch';
import Filter from '../Filter/Filter';

const MotionChefHat = motion(ChefHat);

export default function SearchSection({ onSearch, showFilters, recipes, isQuickRecipe, setIsQuickRecipe, isVegetarian, setIsVegetarian, isVegan, setIsVegan }) {
  return (
    <div className={`max-w-4xl mx-auto w-full ${recipes.length > 0 ? 'sticky top-0 bg-white z-10 shadow-md mb-4' : 'min-h-[30vh] flex flex-col mb-40 justify-center'}`}>
      <div className="bg-white p-4 rounded-lg shadow-md border mb-15 border-gray-200">
        {/* Show this before search */}
        {recipes.length === 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-500 mb-2 flex items-center justify-center">
              <MotionChefHat 
                className="mr-2" 
                size={20}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              Discover recipes using the ingredients you already have
            </h2>
          </>
        )}
        {/* Search input and filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-grow">
            <RecipeSearch onSearch={onSearch} />
          </div>
          {showFilters && (
            <div className="flex items-center gap-2">
              <Filter 
                isQuickRecipe={isQuickRecipe}
                setIsQuickRecipe={setIsQuickRecipe}
              />
              <button
                onClick={() => setIsVegetarian(!isVegetarian)}
                className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors ${isVegetarian ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <Leaf size={16} className="mr-1" />
                Vegetarian
              </button>
              <button
                onClick={() => setIsVegan(!isVegan)}
                className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors ${isVegan ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <Carrot size={16} className="mr-1" />
                Vegan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
