import React from 'react';

const GourmetGenieLogo = ({ className = '' }) => (
  <svg
    className={className}
    width="300"
    height="300"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="150" cy="150" r="150" fill="#FFD700" fillOpacity="0.1"/>
    <path d="M100 200C100 200 120 230 150 230C180 230 200 200 200 200" stroke="#4169E1" strokeWidth="10" strokeLinecap="round"/>
    <path d="M80 120C80 120 100 150 150 150C200 150 220 120 220 120" stroke="#4169E1" strokeWidth="10" strokeLinecap="round"/>
    <path d="M150 150V200" stroke="#4169E1" strokeWidth="10" strokeLinecap="round"/>
    <circle cx="150" cy="100" r="40" fill="#4169E1"/>
    <path d="M130 90C130 90 140 110 150 110C160 110 170 90 170 90" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="135" cy="80" r="5" fill="white"/>
    <circle cx="165" cy="80" r="5" fill="white"/>
    <path d="M110 70L190 70C190 70 180 40 150 40C120 40 110 70 110 70Z" fill="white"/>
    <path d="M140 180H160L150 200L140 180Z" fill="#FFD700"/>
  </svg>
);

export default GourmetGenieLogo;