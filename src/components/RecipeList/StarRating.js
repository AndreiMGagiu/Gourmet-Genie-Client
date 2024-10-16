import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < fullStars
              ? 'text-yellow-400 fill-current'
              : index === fullStars && hasHalfStar
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
          style={index === fullStars && hasHalfStar ? { clipPath: 'inset(0 50% 0 0)' } : {}}
        />
      ))}
    </div>
  );
};

export default StarRating;