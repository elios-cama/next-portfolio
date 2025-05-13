"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

// Import components and data
import InspirationCard from "./components/InspirationCard";
import InspirationModal from "./components/InspirationModal";
import { inspirations } from "./data";
import { InspirationItem } from "./types";

export default function Inspirations() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedCard(id);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  const selectedInspiration = selectedCard !== null 
    ? inspirations.find(i => i.id === selectedCard) 
    : null;

  return (
    <main className="relative min-h-screen w-screen bg-white p-8">
      {/* Title in brackets at top left */}
      <div className="fixed top-8 left-8 z-10">
        <h1 className="text-2xl font-mono text-black">[inspirations]</h1>
      </div>
      
      {/* Grid of inspiration cards */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
      
      {/* Back link - positioned in bottom left corner */}
      <div className="fixed bottom-8 left-8 z-10">
        <Link href="/" className="font-mono text-sm underline text-black">
          Back to home
        </Link>
      </div>
    </main>
  );
} 