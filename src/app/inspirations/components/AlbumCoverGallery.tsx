import React, { useState, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import styles from './albumCoverGallery.module.css';

interface AlbumCoverGalleryProps {
  albumCovers: string[];
}

export default function AlbumCoverGallery({ albumCovers }: AlbumCoverGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Optimized scroll function with momentum
  const scrollRecordBin = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = Math.min(300, container.clientWidth * 0.6); // Responsive scroll amount
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  // Optimized hover handler with debouncing
  const handleHover = useCallback((index: number | null) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    if (index === null) {
      // Add slight delay when leaving to prevent flickering
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredIndex(null);
      }, 50);
    } else {
      setHoveredIndex(index);
    }
  }, []);

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
                onHover={handleHover}
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
  onHover: (index: number | null) => void;
}

function AlbumCover({ imageUrl, index, total, hoveredIndex, onHover }: AlbumCoverProps) {
  // Memoized transform calculations for better performance
  const transformData = useMemo(() => {
    let transform = `rotateY(75deg) translateZ(0)`;
    let zIndex = total - index;
    let boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    let pop = false;
    let edgeOn = false;
    let brightness = 0.8;
    let scale = 1;

    if (hoveredIndex !== null) {
      const distance = Math.abs(index - hoveredIndex);
      
      if (index === hoveredIndex) {
        // Main hovered album - fully face forward with enhanced effects
        transform = `rotateY(0deg) translateZ(80px) scale(1.15)`;
        zIndex = 1000;
        boxShadow = '0 12px 40px rgba(80,80,160,0.35), 0 4px 12px rgba(0,0,0,0.15)';
        pop = true;
        brightness = 1.1;
        scale = 1.15;
      } else if (distance === 1) {
        // Adjacent albums - slight angle with smooth transition
        const angle = index < hoveredIndex ? 25 : -25;
        const translateZ = 30;
        transform = `rotateY(${angle}deg) translateZ(${translateZ}px) scale(1.06)`;
        zIndex = 999 - distance;
        boxShadow = '0 6px 20px rgba(80,80,160,0.18), 0 2px 8px rgba(0,0,0,0.12)';
        brightness = 0.95;
        scale = 1.06;
        edgeOn = Math.abs(angle) > 20;
      } else if (distance === 2) {
        // Second-level neighbors - more angled
        const angle = index < hoveredIndex ? 50 : -50;
        const translateZ = 10;
        transform = `rotateY(${angle}deg) translateZ(${translateZ}px) scale(1.02)`;
        zIndex = 999 - distance;
        boxShadow = '0 4px 12px rgba(80,80,160,0.12), 0 1px 4px rgba(0,0,0,0.08)';
        brightness = 0.85;
        scale = 1.02;
        edgeOn = Math.abs(angle) > 40;
      } else {
        // Distant albums - heavily angled and dimmed
        const angle = index < hoveredIndex ? 78 : -78;
        transform = `rotateY(${angle}deg) translateZ(0) scale(0.96)`;
        zIndex = total - distance;
        boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
        brightness = 0.7;
        scale = 0.96;
        edgeOn = true;
      }
    } else {
      edgeOn = true;
      brightness = 0.8;
    }

    return { transform, zIndex, boxShadow, pop, edgeOn, brightness, scale };
  }, [hoveredIndex, index, total]);

  const coverClass = [
    styles.albumCover,
    styles.transform3d,
    transformData.pop ? styles.pop : '',
    transformData.edgeOn ? styles.edgeOn : ''
  ].join(' ');

  // Optimized event handlers
  const handleMouseEnter = useCallback(() => {
    onHover(index);
  }, [index, onHover]);

  const handleMouseLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  return (
    <div 
      className={styles.albumSlot}
      style={{
        left: `${index * 70}px`,
        zIndex: transformData.zIndex
      }}
    >
      <div 
        className={coverClass}
        style={{ 
          transform: transformData.transform, 
          boxShadow: transformData.boxShadow,
          filter: `brightness(${transformData.brightness})`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.albumFace}>
          <Image 
            src={imageUrl}
            alt={`Album cover ${index + 1}`}
            width={300}
            height={300}
            className="object-cover w-full h-full rounded-xl"
            loading="lazy"
            sizes="(max-width: 768px) 140px, 180px"
          />
          <div className={styles.vinylReflection} />
          <div className={styles.vinylGlow} />
        </div>
        {/* Album spine */}
        <div className={styles.albumSpine}></div>
      </div>
    </div>
  );
} 