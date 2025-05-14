import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './albumCoverGallery.module.css';

interface AlbumCoverGalleryProps {
  albumCovers: string[];
}

export default function AlbumCoverGallery({ albumCovers }: AlbumCoverGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Function to scroll the container
  const scrollRecordBin = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = 300; // Pixels to scroll
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full my-6 md:my-10">
      <h3 className="text-lg md:text-xl font-mono mb-4 md:mb-6">Album Cover Collection</h3>
      
      <div className={`relative ${styles.albumContainer}`}>
        {/* Navigation buttons */}
        <button 
          className={styles.navButton} 
          style={{ left: '10px' }} 
          onClick={() => scrollRecordBin('left')}
          aria-label="Scroll left"
        >
          ←
        </button>
        <button 
          className={styles.navButton} 
          style={{ right: '10px' }} 
          onClick={() => scrollRecordBin('right')}
          aria-label="Scroll right"
        >
          →
        </button>
        
        {/* Record bin with scrollable container */}
        <div className={styles.recordBin} ref={scrollContainerRef}>
          <div className={styles.albumsContainer}>
            {albumCovers.map((cover, index) => (
              <AlbumCover 
                key={index} 
                imageUrl={cover} 
                index={index} 
                total={albumCovers.length} 
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AlbumCoverProps {
  imageUrl: string;
  index: number;
  total: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}

function AlbumCover({ imageUrl, index, total, hoveredIndex, setHoveredIndex }: AlbumCoverProps) {
  // Calculate position for record bin browsing style
  let transform = `rotateY(75deg) translateZ(0)`;
  let zIndex = total - index;
  let boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
  let pop = false;
  let edgeOn = false;

  if (hoveredIndex !== null) {
    const distance = Math.abs(index - hoveredIndex);
    if (index === hoveredIndex) {
      transform = `rotateY(0deg) translateZ(60px) scale(1.12)`;
      zIndex = 1000;
      boxShadow = '0 8px 32px rgba(80,80,160,0.25)';
      pop = true;
    } else if (distance === 1) {
      const angle = index < hoveredIndex ? 35 : -35;
      transform = `rotateY(${angle}deg) translateZ(20px) scale(1.04)`;
      zIndex = 999;
      boxShadow = '0 4px 16px rgba(80,80,160,0.12)';
      edgeOn = Math.abs(angle) > 30;
    } else {
      const angle = index < hoveredIndex ? 75 : -75;
      transform = `rotateY(${angle}deg) translateZ(0) scale(0.98)`;
      zIndex = total - distance;
      boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
      edgeOn = Math.abs(angle) > 60;
    }
  } else {
    edgeOn = true;
  }

  const coverClass = [
    styles.albumCover,
    styles.transform3d,
    pop ? styles.pop : '',
    edgeOn ? styles.edgeOn : ''
  ].join(' ');

  return (
    <div 
      className={styles.albumSlot}
      style={{
        left: `${index * 70}px`,
        zIndex: zIndex as number
      }}
    >
      <div 
        className={coverClass}
        style={{ transform, boxShadow }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className={styles.albumFace}>
          <Image 
            src={imageUrl}
            alt={`Album cover ${index + 1}`}
            width={300}
            height={300}
            className="object-cover w-full h-full rounded-xl"
          />
          <div className={styles.vinylReflection} />
        </div>
        {/* Album spine */}
        <div className={styles.albumSpine}></div>
      </div>
    </div>
  );
} 