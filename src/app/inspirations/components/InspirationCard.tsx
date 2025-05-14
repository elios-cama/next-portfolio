import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InspirationItem } from '../types';

interface InspirationCardProps {
  inspiration: InspirationItem;
  onClick: (id: number) => void;
}

export default function InspirationCard({ inspiration, onClick }: InspirationCardProps) {
  return (
    <motion.div
      className="relative cursor-pointer flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(inspiration.id)}
    >
      <div className="rounded-xl overflow-hidden w-full h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] shadow-sm bg-white flex items-center justify-center">
        <Image
          src={inspiration.image}
          alt={inspiration.title}
          width={120}
          height={120}
          className="object-contain rounded-xl"
        />
      </div>
      <p className="mt-2 text-xs text-center font-mono text-gray-600 truncate w-full">{inspiration.title}</p>
    </motion.div>
  );
} 