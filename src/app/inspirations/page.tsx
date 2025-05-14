"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Import components and data
import InspirationCard from "./components/InspirationCard";
import InspirationModal from "./components/InspirationModal";
import { inspirations } from "./data";

export default function Inspirations() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const router = useRouter();

  const handleCardClick = (id: number) => {
    setSelectedCard(id);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  const selectedInspiration = selectedCard !== null 
    ? inspirations.find(i => i.id === selectedCard) 
    : null;

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchStart - touchEnd;
    
    // Negative swipeDistance means swipe from left to right
    if (touchStart < 50 && swipeDistance < -50) {
      // Only navigate when swiping from edge of screen
      router.push('/');
    }
  };

  return (
    <motion.main 
      className="relative min-h-screen w-screen bg-white p-4 md:p-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Title in brackets at top */}
      <div className="fixed top-4 md:top-8 left-4 md:left-8 z-10">
        <h1 className="text-xl md:text-2xl font-mono text-black">[inspirations]</h1>
      </div>
      
      {/* Grid of inspiration cards */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {inspirations.map((inspiration) => (
            <InspirationCard
              key={inspiration.id}
              inspiration={inspiration}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      
      {/* Expandable dialog */}
      <AnimatePresence>
        {selectedInspiration && (
          <InspirationModal 
            inspiration={selectedInspiration} 
            onClose={handleClose} 
          />
        )}
      </AnimatePresence>
      
      {/* Back link - visible on larger screens only */}
      <div className="fixed bottom-4 md:bottom-8 left-4 md:left-8 z-10 hidden md:block">
        <Link href="/" className="font-mono text-sm underline !text-black">
          Back to home
        </Link>
      </div>
      
      {/* Mobile swipe hint - visible on small screens only */}
      {/* <div className="fixed bottom-4 left-4 z-10 md:hidden">
        <div className="flex items-center text-xs text-gray-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Swipe right to go back</span>
        </div>
      </div> */}
    </motion.main>
  );
} 