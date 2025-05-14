import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InspirationItem } from '../types';
import { SUPABASE_URL } from '@/constants';
import AlbumCoverGallery from './AlbumCoverGallery';

interface InspirationModalProps {
  inspiration: InspirationItem;
  onClose: () => void;
}

export default function InspirationModal({ inspiration, onClose }: InspirationModalProps) {
  // Check if this is the untitled.stream inspiration (ID 3)
  const isUntitledStream = inspiration.id === 3;
  // Check if this is the gawx inspiration (ID 1)
  const isGawx = inspiration.id === 1;
  // Check if this is the rægular inspiration (ID 2)
  const isRaegular = inspiration.id === 2;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <motion.div
        layoutId={`card-${inspiration.id}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-4 md:p-6 z-50 w-[95%] md:w-[90%] max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 md:top-4 right-3 md:right-4 text-gray-500 hover:text-black text-xl z-10"
          aria-label="Close modal"
        >
          ✕
        </button>
        
        {/* Content */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-mono mb-3 md:mb-4">{inspiration.title}</h2>
          
          {/* For untitled.stream: Image content at the top */}
          {isUntitledStream && inspiration.contentImage && (
            <div className="w-full h-auto rounded-xl overflow-hidden mb-4 md:mb-6 flex justify-center">
              <div className="w-full max-w-[300px] md:max-w-[400px]">
                <Image
                  src={inspiration.contentImage}
                  alt={inspiration.title}
                  width={800}
                  height={500}
                  className="object-contain w-full rounded-xl shadow-md"
                />
              </div>
            </div>
          )}
          
          {/* For other inspirations: Video content at the top if available */}
          {!isUntitledStream && inspiration.contentVideo && (
            <div className="w-full h-auto rounded-xl overflow-hidden mb-4 md:mb-6 flex justify-center">
              <div className="w-full max-w-[250px] md:max-w-[300px]">
                <video 
                  src={inspiration.contentVideo} 
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full rounded-xl shadow-md"
                />
              </div>
            </div>
          )}
          
          {/* For other non-Raegular inspirations: Image content if no video */}
          {!isUntitledStream && !isRaegular && !inspiration.contentVideo && inspiration.contentImage && (
            <div className="w-full h-auto rounded-xl overflow-hidden mb-4 md:mb-6 flex justify-center">
              <div className="w-full max-w-[300px] md:max-w-[500px]">
                <Image
                  src={inspiration.contentImage}
                  alt={inspiration.title}
                  width={800}
                  height={500}
                  className="object-contain w-full rounded-xl shadow-md"
                />
              </div>
            </div>
          )}
          
          {/* For Raegular: First image content (main thumbnail) */}
          {isRaegular && inspiration.contentImage && (
            <div className="w-full h-auto rounded-xl overflow-hidden mb-4 md:mb-6 flex justify-center">
              <div className="w-full max-w-[250px] md:max-w-[400px]">
                <Image
                  src={inspiration.contentImage}
                  alt={inspiration.title}
                  width={800}
                  height={500}
                  className="object-contain w-full rounded-xl shadow-md"
                />
              </div>
            </div>
          )}
          
          {/* Simple description */}
          {!inspiration.detailedContent && (
            <p className="text-gray-600 text-center">
              {inspiration.description}
            </p>
          )}
          
          {/* Detailed content */}
          {inspiration.detailedContent && (
            <div className="mt-4 space-y-6">
              <p className="text-gray-700 italic text-center">
                {inspiration.description}
              </p>
              
              <p className="text-gray-700">
                {inspiration.detailedContent.overview}
              </p>
              
              {/* For Raegular: Album Cover 3D Gallery */}
              {isRaegular && inspiration.detailedContent.albumCovers && (
                <AlbumCoverGallery albumCovers={inspiration.detailedContent.albumCovers} />
              )}
              
              {/* Embedded iframe if available */}
              {inspiration.detailedContent?.embedCode && (
                <div className="w-full mt-4 md:mt-6 mb-4 md:mb-6">
                  <div className="max-w-[500px] mx-auto">
                    <div dangerouslySetInnerHTML={{ __html: inspiration.detailedContent.embedCode }} />
                  </div>
                </div>
              )}
              
              <div className="mt-6 md:mt-8">
                <h3 className="text-lg md:text-xl font-mono mb-3 md:mb-4">Why it&apos;s an inspiration:</h3>
                <div className="space-y-3 md:space-y-4">
                  {inspiration.detailedContent.highlights.map((highlight, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">{highlight.title}</h4>
                      <p className="text-gray-700 text-sm md:text-base">{highlight.description}</p>
                      
                      {/* Insert Gawx's second image after the first highlight */}
                      {isGawx && index === 0 && (
                        <div className="w-full h-auto rounded-xl overflow-hidden my-4 md:my-6 flex justify-center">
                          <div className="w-full max-w-[300px] md:max-w-[500px]">
                            <Image 
                              src={`${SUPABASE_URL}/images/inspirations/content/gawx_content_2.png`}
                              alt="Gawx's creative process"
                              width={800}
                              height={500}
                              className="object-contain w-full rounded-xl shadow-md mt-3 md:mt-4"
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Insert Gawx's third image after the second highlight */}
                      {isGawx && index === 1 && (
                        <div className="w-full h-auto rounded-xl overflow-hidden my-4 md:my-6 flex justify-center">
                          <div className="w-full max-w-[300px] md:max-w-[500px]">
                            <Image 
                              src={`${SUPABASE_URL}/images/inspirations/content/gawx_content_3.png`}
                              alt="Gawx's creative space"
                              width={800}
                              height={500}
                              className="object-contain w-full rounded-xl shadow-md mt-3 md:mt-4"
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Insert additional video after the third highlight */}
                      {index === 2 && inspiration.detailedContent?.additionalVideo && (
                        <div className="w-full h-auto rounded-xl overflow-hidden my-4 md:my-6 flex justify-center">
                          <div className="w-full max-w-[250px] md:max-w-[300px]">
                            <video 
                              src={inspiration.detailedContent.additionalVideo} 
                              controls
                              autoPlay
                              loop
                              muted
                              className="w-full rounded-xl shadow-md mt-3 md:mt-4"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* For untitled.stream: Video content at the bottom */}
              {isUntitledStream && inspiration.contentVideo && (
                <div className="w-full h-auto rounded-xl overflow-hidden mt-4 md:mt-6 flex justify-center">
                  <div className="w-full max-w-[250px] md:max-w-[300px]">
                    <video 
                      src={inspiration.contentVideo} 
                      controls
                      autoPlay
                      loop
                      muted
                      className="w-full rounded-xl shadow-md"
                    />
                  </div>
                </div>
              )}
              
              {/* For other inspirations: Additional image at the bottom if both image and video exist */}
              {!isUntitledStream && !isRaegular && inspiration.contentImage && inspiration.contentVideo && (
                <div className="w-full h-auto rounded-xl overflow-hidden mt-4 md:mt-6 flex justify-center">
                  <div className="w-full max-w-[250px] md:max-w-[300px]">
                    <Image
                      src={inspiration.contentImage}
                      alt={`${inspiration.title} interface`}
                      width={800}
                      height={500}
                      className="object-contain w-full rounded-xl shadow-md"
                    />
                  </div>
                </div>
              )}
              
              {/* Attribution section */}
              {inspiration.detailedContent.attribution && (
                <div className="mt-6 md:mt-8 pt-3 md:pt-4 border-t border-gray-200">
                  <p className="text-xs md:text-sm text-gray-500">
                    Content inspired by {inspiration.detailedContent.attribution.author}
                    {inspiration.detailedContent.attribution.link && (
                      <span> • <a 
                        href={inspiration.detailedContent.attribution.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {inspiration.detailedContent.attribution.linkText || 'Learn more'}
                      </a></span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
} 