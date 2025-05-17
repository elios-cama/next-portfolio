import React from 'react';
import Image from 'next/image';
import { SUPABASE_URL } from '@/constants';
import { Project } from '../data/projects';

interface ImageFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  fileId: string | null;
}

export default function ImageFileModal({ isOpen, onClose, project, fileId }: ImageFileModalProps) {
  if (!isOpen || !project || !fileId) return null;

  // Get image source based on project and fileId
  const getImageSource = () => {
    if (project.id === 'tournament-bot') {
      if (fileId === 'screenshot1') {
        return `${SUPABASE_URL}/images/projects/telegram_bot/telegram_bot_content_1.png`;
      } else if (fileId === 'screenshot2') {
        return `${SUPABASE_URL}/images/projects/telegram_bot/telegram_bot_content_2.png`;
      } else if (fileId === 'design') {
        return `${SUPABASE_URL}/images/projects/telegram_bot/telegram_bot_content_3.png`;
      }
    } else if (project.id === 'vinted-uae') {
      if (fileId === 'screenshot1') {
        return `${SUPABASE_URL}/images/projects/yabi/yabi_content_1.png`;
      } else if (fileId === 'screenshot2') {
        return `${SUPABASE_URL}/images/projects/yabi/yabi_content_2.png`;
      }
    } else {
      if (fileId === 'screenshot1') {
        return `${SUPABASE_URL}/images/projects/${project.id}-screenshot1.png`;
      } else if (fileId === 'screenshot2') {
        return `${SUPABASE_URL}/images/projects/${project.id}-screenshot2.png`;
      } else if (fileId === 'design') {
        return `${SUPABASE_URL}/images/projects/${project.id}-design.png`;
      }
    }
    
    // Fallback to the project preview image
    return `${SUPABASE_URL}${project.images[0]}`;
  };

  // Get file name
  const getFileName = () => {
    if (project.id === 'tournament-bot') {
      if (fileId === 'screenshot1') return 'design.png';
      if (fileId === 'screenshot2') return 'payment_1.png';
      if (fileId === 'design') return 'payment_2.png';
    } else if (project.id === 'vinted-uae') {
      if (fileId === 'screenshot1') return 'screenshot_1.png';
      if (fileId === 'screenshot2') return 'screenshot_2.png';
    } else {
      if (fileId === 'screenshot1') return 'screenshot-1.png';
      if (fileId === 'screenshot2') return 'screenshot-2.png';
      if (fileId === 'design') return 'design.png';
    }
    return 'image.png';
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* Modal container - Image preview style */}
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-4xl max-h-[85vh] animate-scale-in">
        {/* Header with file name and close button */}
        <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-green-400 mr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h3 className="font-mono text-base font-medium text-white">{getFileName()}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Image viewer */}
        <div className="flex items-center justify-center h-[calc(85vh-64px)] bg-gray-900 p-4">
          <div className="relative h-full w-full">
            <Image
              src={getImageSource()}
              alt={`${project.title} - ${getFileName()}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 