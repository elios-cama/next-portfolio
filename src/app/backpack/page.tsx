"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SUPABASE_URL } from "@/constants";

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
    { id: 1, name: "MacBook Pro", position: { x: 350, y: 350 }, image: `${SUPABASE_URL}/images/backpack/macbook.png`, size: 240, rotation: -4, description: "My workhorse for coding and design work, also sometimes used as a speaker." },
    { id: 2, name: "Kindle", position: { x: 900, y: 250 }, image: `${SUPABASE_URL}/images/backpack/kindle.png`, size: 160, rotation: 3, description: "What is life without a book? Current readings include works by Hermann Hesse and Sylvain Tesson." },
    { id: 3, name: "Moka Pot", position: { x: 550, y: 650 }, image: `${SUPABASE_URL}/images/backpack/moka_2.png`, size: 180, rotation: -2, description: "Makes the perfect espresso every morning. My Italian side wouldn't have it any other way!" },
    { id: 4, name: "AirPods", position: { x: 1100, y: 500 }, image: `${SUPABASE_URL}/images/backpack/airpods.png`, size: 140, rotation: 2, description: "When I want to retreat into my own world and embrace my inner unsociable nerd, these are my go-to. Music and podcasts are my trusty sidekicks in this quest for solitude." },
    { id: 5, name: "Basil Plant", position: { x: 300, y: 900 }, image: `${SUPABASE_URL}/images/backpack/basil_1.png`, size: 210, rotation: -3, description: "Ah, my little basil plant! My Italian side can't live without a touch of green and a hint of pesto magic on the desk." },
    { id: 6, name: "SoundCloud", position: { x: 1300, y: 750 }, image: `${SUPABASE_URL}/images/backpack/soundcloud_2.png`, size: 180, rotation: 4, description: "Ah, SoundCloud, my secret lair where I unearth musical gems before they become mainstream. Yes, I knew them before they were cool!" },
    { id: 7, name: "Adidas Spezial", position: { x: 450, y: 1200 }, image: `${SUPABASE_URL}/images/backpack/spezial.png`, size: 220, rotation: -1, description: "These sneakers are so special and unique, they only feel that way after a billion others have worn them first!" },
    { id: 8, name: "Turntable", position: { x: 950, y: 1350 }, image: `${SUPABASE_URL}/images/backpack/turntable_1.png`, size: 260, rotation: 3, description: "The irony of my life: a vinyl collection without a turntable. I guess I'm just a collector of silent music!" },
    { id: 9, name: "Negroni", position: { x: 1400, y: 1000 }, image: `${SUPABASE_URL}/images/backpack/negroni.png`, size: 150, rotation: -2, description: "Ah, the Negroni! The cocktail that thinks it's fancier than it is, with a bitterness that could rival my Monday mornings." },
    { id: 10, name: "Running Shoes", position: { x: 1600, y: 450 }, image: `${SUPABASE_URL}/images/backpack/running.png`, size: 190, rotation: 2, description: "These trusty running shoes are my escape plan. After a day of wrestling with bugs, a 5K run is my therapy. Who needs a shrink when you have sneakers?" },
    { id: 11, name: "Jacket", position: { x: 1750, y: 850 }, image: `${SUPABASE_URL}/images/backpack/jacket.png`, size: 260, rotation: -3, description: "Essential for unpredictable weather." },
    { id: 12, name: "Jeans", position: { x: 1500, y: 1300 }, image: `${SUPABASE_URL}/images/backpack/jeans.png`, size: 220, rotation: 1, description: "Could these jeans BE any more classic? Perfectly worn in." },
    { id: 13, name: "Pullover", position: { x: 800, y: 1600 }, image: `${SUPABASE_URL}/images/backpack/pullover.png`, size: 240, rotation: -2, description: "Cozy and perfect for layering." },
    { id: 14, name: "Moustache Holder", position: { x: 250, y: 600 }, image: `${SUPABASE_URL}/images/backpack/moustache_1.png`, size: 145, rotation: 3, description: "The ultimate sidekick in my quest for facial hair glory. It's not just a moustache; it's a lifestyle choice!" },
    { id: 15, name: "Apple Podcasts", position: { x: 1200, y: 250 }, image: `${SUPABASE_URL}/images/backpack/podcast.png`, size: 160, rotation: -2, description: "Three hours of listening to Lex or Huberman is the secret sauce to unlocking my inner genius—or at least that's what I tell myself while pretending to be productive!" },
  ];

  return (
    <main 
      className="min-h-screen w-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #F8F1E7 0%, #EFE6D9 100%)'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left-aligned header */}
      <div className="fixed top-0 left-0 p-6 z-50">
        <h1 className="uppercase text-2xl font-mono tracking-wide text-black">BACKPACK</h1>
      </div>

      {/* Instructions */}
      <div className="fixed top-16 left-0 p-6 z-50">
        <p className="text-sm font-mono text-black/80">Drag to explore my essentials</p>
      </div>

      {/* Back link */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link href="/" className="font-mono text-sm underline text-gray-700 hover:opacity-70 transition-opacity" style={{ color: 'rgb(55, 65, 81)' }}>
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
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            <div className="relative transition-all duration-300 hover:scale-110">
              <Image
                src={`${SUPABASE_URL}/images/homepage/elios_off.png`}
                alt="Elios"
                width={150}
                height={150}
                className="object-contain select-none drop-shadow-lg h-auto w-auto"
                priority
                draggable="false"
              />
              <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-black/5 rounded-full filter blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Render all item images in the first layer */}
        {items.map((item) => (
          <div 
            key={`image-${item.id}`}
            className="absolute transition-all duration-300 hover:scale-105 hover:-translate-y-1"
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
                className="object-contain select-none pointer-events-none drop-shadow-md h-auto w-auto"
                draggable="false"
                priority
              />
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-black/5 rounded-xl filter blur-lg"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Layer 2: Labels and Descriptions (rendered on top) */}
        {/* Elios label */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative w-[250px] h-[250px]">
            <div 
              className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-black border border-black/30 rounded-full px-5 py-2 cursor-pointer hover:bg-white z-50 pointer-events-auto transition-all duration-200 hover:shadow-md"
              onClick={(e) => toggleLabel(0, e)}
            >
              <span className="font-mono text-sm whitespace-nowrap text-black">Me</span>
            </div>
            {expandedLabel === 0 && (
              <div className="absolute top-[100%] mt-10 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-black/20 rounded-lg p-4 z-50 w-[280px] shadow-lg pointer-events-auto animate-fade-in-up">
                <p className="font-mono text-sm text-black">Hey there! I'm a software engineer by day, music lover by night, and a coffee enthusiast 24/7. Just don't make a mess in my backpack, okay? It's organized chaos in here!</p>
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
                className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-black/30 rounded-full px-3 py-1 cursor-pointer hover:bg-white transition-all duration-200 hover:shadow-md z-50 pointer-events-auto text-black"
                onClick={(e) => toggleLabel(item.id, e)}
              >
                <span className="font-mono text-xs whitespace-nowrap text-black">{item.name}</span>
              </div>
              {expandedLabel === item.id && (
                <div className="absolute top-[100%] mt-10 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-black/20 rounded-lg p-4 z-50 w-[280px] shadow-lg pointer-events-auto animate-fade-in-up">
                  <p className="font-mono text-xs text-black">{item.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 