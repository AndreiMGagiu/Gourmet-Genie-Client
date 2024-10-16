// components/Header/Header.js
import React from 'react';
import { Wand2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
        <Wand2 className="mr-2" size={28} />
        Gourmet Genie
      </h1>
      <p className="text-base text-gray-600 mb-4">
        Your culinary wishes are our command!
      </p>
    </header>
  );
}