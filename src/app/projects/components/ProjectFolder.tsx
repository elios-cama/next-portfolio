import React, { useState } from 'react';
import Image from 'next/image';
import { SUPABASE_URL } from '@/constants';
import { Project } from '../data/projects';

interface ProjectFolderProps {
  project: Project;
  onClick: (project: Project) => void;
  onDoubleClick: (project: Project) => void;
  isSelected?: boolean;
}

export default function ProjectFolder({ project, onClick, onDoubleClick, isSelected = false }: ProjectFolderProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Single click selects the folder
    setClicked(true);
    onClick(project);
  };

  const handleDoubleClick = () => {
    // Double click opens the folder/project
    onDoubleClick(project);
  };

  return (
    <div 
      className={`flex flex-col items-center group transition-transform duration-200 
                 ${isSelected || clicked ? 'bg-blue-100 rounded-lg' : 'hover:bg-gray-50 hover:scale-105'} 
                 p-2`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="relative w-24 h-24">
        <Image 
          src={`${SUPABASE_URL}/images/projects/folder.webp`}
          alt={`${project.title} Folder`}
          fill
          className={`object-contain ${(isSelected || clicked) ? 'opacity-90' : ''}`}
        />
      </div>
      <p className={`text-sm font-mono text-center mt-2 ${(isSelected || clicked) ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'} transition-colors`}>
        {project.title}
      </p>
    </div>
  );
} 