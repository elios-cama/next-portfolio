"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Backpack() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - startPos.x,
      y: touch.clientY - startPos.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Center the canvas on initial load
    if (canvasRef.current) {
      const centerX = (window.innerWidth - 2200) / 2;
      const centerY = (window.innerHeight - 2200) / 2;
      setPosition({ x: centerX, y: centerY });
    }
  }, []);

  // Define the items with their positions and fixed rotation values
  const items = [
    { id: 1, name: "MacBook Pro", position: { x: 350, y: 350 }, image: "/images/backpack/macbook.png", size: 300, rotation: -4 },
    { id: 2, name: "Kindle", position: { x: 900, y: 250 }, image: "/images/backpack/kindle.png", size: 200, rotation: 3 },
    { id: 3, name: "Moka Pot", position: { x: 550, y: 650 }, image: "/images/backpack/moka.png", size: 230, rotation: -2 },
    { id: 4, name: "AirPods", position: { x: 1100, y: 500 }, image: "/images/backpack/airpods.png", size: 180, rotation: 2 },
    { id: 5, name: "Basil Plant", position: { x: 300, y: 900 }, image: "/images/backpack/basil.png", size: 260, rotation: -3 },
    { id: 6, name: "SoundCloud", position: { x: 1300, y: 750 }, image: "/images/backpack/soundcloud.png", size: 220, rotation: 4 },
    { id: 7, name: "Adidas Spezial", position: { x: 450, y: 1200 }, image: "/images/backpack/spezial.png", size: 280, rotation: -1 },
    { id: 8, name: "Turntable", position: { x: 950, y: 1350 }, image: "/images/backpack/turntable.png", size: 320, rotation: 3 },
    { id: 9, name: "Negroni", position: { x: 1400, y: 1000 }, image: "/images/backpack/negroni.png", size: 190, rotation: -2 },
    { id: 10, name: "Running Shoes", position: { x: 1600, y: 450 }, image: "/images/backpack/running.png", size: 240, rotation: 2 },
    { id: 11, name: "Jacket", position: { x: 1750, y: 850 }, image: "/images/backpack/jacket.png", size: 320, rotation: -3 },
    { id: 12, name: "Jeans", position: { x: 1500, y: 1300 }, image: "/images/backpack/jeans.png", size: 280, rotation: 1 },
    { id: 13, name: "Pullover", position: { x: 800, y: 1600 }, image: "/images/backpack/pullover.png", size: 300, rotation: -2 },
    { id: 14, name: "Moustache", position: { x: 250, y: 600 }, image: "/images/backpack/moustache.png", size: 180, rotation: 3 },
  ];

  return (
    <main 
      className="min-h-screen w-screen overflow-hidden bg-[#c9c9c9] relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left-aligned header */}
      <div className="fixed top-0 left-0 p-6 z-50">
        <h1 className="uppercase text-2xl font-mono tracking-wide">BACKPACK</h1>
      </div>

      {/* Instructions */}
      <div className="fixed top-16 left-0 p-6 z-50">
        <p className="text-sm font-mono text-gray-700">Drag to explore my essentials</p>
      </div>

      {/* Back link */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link href="/" className="font-mono text-sm underline">
          Back to home
        </Link>
      </div>
      
      {/* Canvas area */}
      <div 
        ref={canvasRef}
        className="absolute cursor-grab w-[2200px] h-[2200px]"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Elios image in the center with more space */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-[450px] h-[450px] flex items-center justify-center">
              <Image
                src="/images/elios.png"
                alt="Elios"
                width={350}
                height={350}
                className="object-contain select-none"
                priority
                draggable="false"
              />
            </div>
            <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white border border-white rounded-full px-5 py-2">
              <span className="font-mono text-sm whitespace-nowrap">Me</span>
            </div>
          </div>
        </div>
        
        {/* Render all items */}
        {items.map((item) => (
          <div 
            key={item.id}
            className="absolute transition-transform duration-300 hover:scale-105"
            style={{ 
              left: item.position.x, 
              top: item.position.y,
              transform: `rotate(${item.rotation}deg)`
            }}
          >
            <div className="relative">
              <Image
                src={item.image}
                alt={item.name}
                width={item.size}
                height={item.size}
                className="object-contain select-none pointer-events-none"
                draggable="false"
                priority
              />
              <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-full px-3 py-1 select-none pointer-events-none">
                <span className="font-mono text-xs whitespace-nowrap">{item.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 