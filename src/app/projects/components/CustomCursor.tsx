import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-50 transition-transform duration-75"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        transform: `translate(-50%, -50%) scale(${clicking ? 0.8 : 1})` 
      }}
    >
      <div className="w-6 h-6 rounded-full border-2 border-blue-400 bg-blue-100 bg-opacity-30" />
    </div>
  );
} 