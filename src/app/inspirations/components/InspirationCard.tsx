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
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(inspiration.id)}
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
  );
} 