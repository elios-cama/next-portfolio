"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Backpack() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [expandedLabel, setExpandedLabel] = useState<number | null>(null);
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

  const toggleLabel = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dragging when clicking labels
    setExpandedLabel(expandedLabel === id ? null : id);
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
    { id: 1, name: "MacBook Pro", position: { x: 350, y: 350 }, image: "/images/backpack/macbook.png", size: 300, rotation: -4, description: "My workhorse for coding and design work, also sometimes used as a speaker." },
    { id: 2, name: "Kindle", position: { x: 900, y: 250 }, image: "/images/backpack/kindle.png", size: 200, rotation: 3, description: "What is life without a book? Current readings include works by Hermann Hesse and Sylvain Tesson." },
    { id: 3, name: "Moka Pot", position: { x: 550, y: 650 }, image: "/images/backpack/moka.png", size: 230, rotation: -2, description: "Makes the perfect espresso every morning. My Italian side wouldn't have it any other way!" },
    { id: 4, name: "AirPods", position: { x: 1100, y: 500 }, image: "/images/backpack/airpods.png", size: 180, rotation: 2, description: "When I want to retreat into my own world and embrace my inner unsociable nerd, these are my go-to. Music and podcasts are my trusty sidekicks in this quest for solitude." },
    { id: 5, name: "Basil Plant", position: { x: 300, y: 900 }, image: "/images/backpack/basil.png", size: 260, rotation: -3, description: "Ah, my little basil plant! My Italian side can't live without a touch of green and a hint of pesto magic on the desk." },
    { id: 6, name: "SoundCloud", position: { x: 1300, y: 750 }, image: "/images/backpack/soundcloud.png", size: 220, rotation: 4, description: "Ah, SoundCloud, my secret lair where I unearth musical gems before they become mainstream. Yes, I knew them before they were cool!" },
    { id: 7, name: "Adidas Spezial", position: { x: 450, y: 1200 }, image: "/images/backpack/spezial.png", size: 280, rotation: -1, description: "These sneakers are so special and unique, they only feel that way after a billion others have worn them first!" },
    { id: 8, name: "Turntable", position: { x: 950, y: 1350 }, image: "/images/backpack/turntable.png", size: 320, rotation: 3, description: "The irony of my life: a vinyl collection without a turntable. I guess I'm just a collector of silent music!" },
    { id: 9, name: "Negroni", position: { x: 1400, y: 1000 }, image: "/images/backpack/negroni.png", size: 190, rotation: -2, description: "Ah, the Negroni! The cocktail that thinks it's fancier than it is, with a bitterness that could rival my Monday mornings." },
    { id: 10, name: "Running Shoes", position: { x: 1600, y: 450 }, image: "/images/backpack/running.png", size: 240, rotation: 2, description: "These trusty running shoes are my escape plan. After a day of wrestling with bugs, a 5K run is my therapy. Who needs a shrink when you have sneakers?" },
    { id: 11, name: "Jacket", position: { x: 1750, y: 850 }, image: "/images/backpack/jacket.png", size: 320, rotation: -3, description: "Essential for unpredictable weather." },
    { id: 12, name: "Jeans", position: { x: 1500, y: 1300 }, image: "/images/backpack/jeans.png", size: 280, rotation: 1, description: "Could these jeans BE any more classic? Perfectly worn in." },
    { id: 13, name: "Pullover", position: { x: 800, y: 1600 }, image: "/images/backpack/pullover.png", size: 300, rotation: -2, description: "Cozy and perfect for layering." },
    { id: 14, name: "Moustache Holder", position: { x: 250, y: 600 }, image: "/images/backpack/moustache.png", size: 180, rotation: 3, description: "The ultimate sidekick in my quest for facial hair glory. It's not just a moustache; it's a lifestyle choice!" },
    { id: 15, name: "Apple Podcasts", position: { x: 1200, y: 250 }, image: "/images/backpack/podcast.png", size: 200, rotation: -2, description: "Three hours of listening to Lex or Huberman is the secret sauce to unlocking my inner genius—or at least that's what I tell myself while pretending to be productive!" },
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
        {/* Layer 1: Images */}
        {/* Elios image in the center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[250px] h-[250px] flex items-center justify-center">
            <Image
              src="/images/elios.png"
              alt="Elios"
              width={180}
              height={180}
              className="object-contain select-none"
              priority
              draggable="false"
            />
          </div>
        </div>
        
        {/* Render all item images in the first layer */}
        {items.map((item) => (
          <div 
            key={`image-${item.id}`}
            className="absolute transition-transform duration-300 hover:scale-105"
            style={{ 
              left: item.position.x, 
              top: item.position.y,
              transform: `rotate(${item.rotation}deg)`
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={item.size}
              height={item.size}
              className="object-contain select-none pointer-events-none"
              draggable="false"
              priority
            />
          </div>
        ))}

        {/* Layer 2: Labels and Descriptions (rendered on top) */}
        {/* Elios label */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative w-[250px] h-[250px]">
            <div 
              className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white border border-white rounded-full px-5 py-2 cursor-pointer hover:bg-gray-800 z-50 pointer-events-auto"
              onClick={(e) => toggleLabel(0, e)}
            >
              <span className="font-mono text-sm whitespace-nowrap">Me</span>
            </div>
            {expandedLabel === 0 && (
              <div className="absolute top-[100%] mt-10 left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-lg p-3 z-50 w-[280px] shadow-md pointer-events-auto">
                <p className="font-mono text-sm">Hey there! I'm a software engineer by day, music lover by night, and a coffee enthusiast 24/7. Just don't make a mess in my backpack, okay? It's organized chaos in here!</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Render all item labels separately in the second layer */}
        {items.map((item) => (
          <div 
            key={`label-${item.id}`}
            className="absolute pointer-events-none"
            style={{ 
              left: item.position.x, 
              top: item.position.y,
              transform: `rotate(${item.rotation}deg)`
            }}
          >
            <div className="relative" style={{ width: `${item.size}px`, height: `${item.size}px` }}>
              <div 
                className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-full px-3 py-1 cursor-pointer hover:bg-gray-100 z-50 pointer-events-auto"
                onClick={(e) => toggleLabel(item.id, e)}
              >
                <span className="font-mono text-xs whitespace-nowrap">{item.name}</span>
              </div>
              {expandedLabel === item.id && (
                <div className="absolute top-[100%] mt-10 left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-lg p-3 z-50 w-[280px] shadow-md pointer-events-auto">
                  <p className="font-mono text-xs">{item.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 