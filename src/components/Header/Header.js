import React from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Utensils } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-center mb-4">
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <ChefHat className="text-yellow-500 mr-2" size={36} />
        </motion.div>
        <h1 className="text-4xl font-bold text-green-600">Gourmet Genie</h1>
      </div>
      <p className="text-xl text-gray-600 mb-8">
        Your trusted guide to creating delicious meals with the ingredients you have
      </p>
      <div className="flex justify-center items-center space-x-4 text-gray-500">
        <Utensils size={24} />
        <span>Discover • Cook • Enjoy</span>
        <Utensils size={24} />
      </div>
    </header>
  )
}