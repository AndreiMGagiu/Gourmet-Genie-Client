import React from 'react';
import GourmetGenieLogo from '../GourmetGenieLogo';

export default function BackgroundElements() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <GourmetGenieLogo className="w-64 h-64 opacity-5" />
      </div>
    </>
  );
}