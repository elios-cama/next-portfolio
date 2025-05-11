"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Sample inspirations data - replace the images with your own later
const inspirations = [
  {
    id: 1,
    title: "gawx",
    image: "/images/inspirations/gawx_logo.png",
    contentImage: "/images/inspirations/gawx_1.webp",
    description: "Creative digital content with a focus on clean visual aesthetics."
  },
  {
    id: 2,
    title: "severance",
    image: "/images/inspirations/severance_logo.png",
    contentImage: "/images/inspirations/severance_1.webp", 
    description: "Minimalist design inspired by the show's stark visual contrasts and deliberate compositions."
  },
  {
    id: 3,
    title: "untitled.stream",
    image: "/images/inspirations/untitled_logo.png",
    contentImage: "/images/inspirations/untitled_1.png",
    description: "A platform for unreleased music with a simple, distraction-free interface."
  }
];

export default function Inspirations() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedCard(id);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <main className="relative min-h-screen w-screen bg-white p-8">
      {/* Title in brackets at top left */}
      <div className="fixed top-8 left-8 z-10">
        <h1 className="text-2xl font-mono text-black">[inspirations]</h1>
      </div>
      
      {/* Grid of inspiration cards */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inspirations.map((inspiration) => (
            <motion.div
              key={inspiration.id}
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(inspiration.id)}
            >
              <div className="rounded-xl overflow-hidden w-[160px] h-[160px] shadow-sm bg-white flex items-center justify-center">
                <Image
                  src={inspiration.image}
                  alt={inspiration.title}
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-xs text-center font-mono text-gray-600">{inspiration.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Expandable dialog */}
      <AnimatePresence>
        {selectedCard !== null && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-40"
              onClick={handleClose}
            />
            
            {/* Dialog */}
            <motion.div
              layoutId={`card-${selectedCard}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-[90%] max-w-lg shadow-xl"
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              
              {/* Content */}
              {inspirations.find(i => i.id === selectedCard) && (
                <>
                  <div className="flex flex-col items-center">
                    <div className="w-full h-auto rounded-xl overflow-hidden mb-6">
                      <Image
                        src={inspirations.find(i => i.id === selectedCard)!.contentImage}
                        alt={inspirations.find(i => i.id === selectedCard)!.title}
                        width={800}
                        height={500}
                        className="object-contain w-full"
                      />
                    </div>
                    <h2 className="text-xl font-mono mb-4">{inspirations.find(i => i.id === selectedCard)!.title}</h2>
                    <p className="text-gray-600 text-center">
                      {inspirations.find(i => i.id === selectedCard)!.description}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </>
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