import React from 'react';
import Image from 'next/image';
import { SUPABASE_URL } from '@/constants';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    images: string[];
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen || !project) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* Modal container - Quick Look style */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl max-h-[80vh] animate-scale-in">
        {/* Header with file name and close button */}
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-blue-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
            <h3 className="font-mono text-sm font-medium text-black">{project.title}.md</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Content area - scrollable */}
        <div className="overflow-y-auto p-6 max-h-[calc(80vh-64px)]">
          <div className="flex flex-col space-y-6">
            {/* Project preview images */}
            <div className="bg-gray-100 rounded-lg p-1 overflow-hidden">
              <div className="relative h-[250px] w-full flex items-center justify-center">
                {project.images.length > 0 ? (
                  <Image 
                    src={`${SUPABASE_URL}${project.images[0]}`}
                    alt={`${project.title} preview`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Project description in markdown-like format */}
            <div className="font-mono text-sm space-y-4 text-gray-800">
              <h2 className="text-lg font-bold text-gray-900"># {project.title}</h2>
              
              <p className="whitespace-pre-line">{project.description}</p>
              
              <div>
                <h3 className="text-md font-bold mb-2">## Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 