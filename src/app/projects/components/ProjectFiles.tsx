import React from 'react';
import { Project } from '../data/projects';

interface ProjectFilesProps {
  project: Project;
  onOpenTextFile: (project: Project, fileId: string) => void;
  onOpenImageFile: (project: Project, fileId: string) => void;
}

export default function ProjectFiles({ project, onOpenTextFile, onOpenImageFile }: ProjectFilesProps) {
  // Generate a set of standard files for each project
  const getProjectFiles = () => {
    if (project.id === 'tournament-bot') {
      return [
        {
          id: 'readme',
          name: 'README.md',
          type: 'text',
          size: '12 KB',
          kind: 'Markdown Document',
        },
        {
          id: 'screenshot1',
          name: 'design.png',
          type: 'image',
          size: '2.4 MB',
          kind: 'PNG Image',
        },
        {
          id: 'screenshot2',
          name: 'payment_1.png',
          type: 'image',
          size: '3.1 MB',
          kind: 'PNG Image',
        },
        {
          id: 'design',
          name: 'payment_2.png',
          type: 'image',
          size: '4.2 MB',
          kind: 'PNG Image',
        }
      ];
    } else if (project.id === 'vinted-uae') {
      return [
        {
          id: 'readme',
          name: 'README.md',
          type: 'text',
          size: '8 KB',
          kind: 'Markdown Document',
        },
        {
          id: 'screenshot1',
          name: 'screenshot_1.png',
          type: 'image',
          size: '2.8 MB',
          kind: 'PNG Image',
        },
        {
          id: 'screenshot2',
          name: 'screenshot_2.png',
          type: 'image',
          size: '3.2 MB',
          kind: 'PNG Image',
        }
      ];
    } else {
      return [
        {
          id: 'readme',
          name: 'README.txt',
          type: 'text',
          size: '4 KB',
          kind: 'Text Document',
        },
        {
          id: 'screenshot1',
          name: 'screenshot-1.png',
          type: 'image',
          size: '1.2 MB',
          kind: 'PNG Image',
        },
        {
          id: 'screenshot2',
          name: 'screenshot-2.png',
          type: 'image',
          size: '1.4 MB',
          kind: 'PNG Image',
        },
        {
          id: 'notes',
          name: 'notes.txt',
          type: 'text',
          size: '2 KB',
          kind: 'Text Document',
        },
        {
          id: 'design',
          name: 'design.png',
          type: 'image',
          size: '3.5 MB',
          kind: 'PNG Image',
        }
      ];
    }
  };

  const files = getProjectFiles();

  const handleFileClick = (fileId: string, fileType: string) => {
    // Open different modals based on file type
    if (fileType === 'text') {
      onOpenTextFile(project, fileId);
    } else if (fileType === 'image') {
      onOpenImageFile(project, fileId);
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType === 'text') {
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="w-5 h-5 text-blue-500" 
          fill="none" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      );
    } else {
      return (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="w-5 h-5 text-green-500" 
          fill="none"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      );
    }
  };

  // Format the dates to be in the future (2025) for a cool effect
  const getModifiedDate = (index: number) => {
    // Create a fixed date in 2025
    const baseDate = new Date(2025, 4, 16); // May 16, 2025
    // Subtract days based on index to make dates slightly different
    baseDate.setDate(baseDate.getDate() - index * 2);
    
    return baseDate.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Desktop view: grid with all columns
  const desktopView = () => (
    <div className="hidden sm:block w-full">
      <div className="bg-white rounded-md w-full">
        {/* Table header */}
        <div className="grid grid-cols-12 text-xs font-medium text-gray-500 border-b border-gray-200 py-2 px-3">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Date Modified</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Kind</div>
        </div>

        {/* File rows */}
        {files.map((file, index) => (
          <div 
            key={file.id}
            onClick={() => handleFileClick(file.id, file.type)}
            className="grid grid-cols-12 text-sm text-gray-700 border-b border-gray-100 py-2 px-3 hover:bg-blue-50"
          >
            <div className="col-span-5 flex items-center">
              <div className="mr-2">
                {getFileIcon(file.type)}
              </div>
              {file.name}
            </div>
            <div className="col-span-3 text-gray-500 text-xs self-center">
              {getModifiedDate(index)}
            </div>
            <div className="col-span-2 text-gray-500 text-xs self-center">
              {file.size}
            </div>
            <div className="col-span-2 text-gray-500 text-xs self-center">
              {file.kind}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile view: simplified layout with just name and icon
  const mobileView = () => (
    <div className="block sm:hidden w-full">
      <div className="bg-white rounded-md w-full">
        {/* Mobile header */}
        <div className="flex justify-between items-center text-xs font-medium text-gray-500 border-b border-gray-200 py-2 px-3">
          <div className="flex-grow">Name</div>
          <div className="w-16 text-right">Size</div>
        </div>

        {/* Mobile file rows */}
        {files.map((file, index) => (
          <div 
            key={file.id}
            onClick={() => handleFileClick(file.id, file.type)}
            className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-100 py-3 px-3 hover:bg-blue-50"
          >
            <div className="flex items-center">
              <div className="mr-2 flex-shrink-0">
                {getFileIcon(file.type)}
              </div>
              <div>
                <div className="text-black font-medium truncate max-w-[150px]">{file.name}</div>
                <div className="text-xs text-gray-500">
                  {getModifiedDate(index)}
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-xs text-right">
              {file.size}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {desktopView()}
      {mobileView()}
    </div>
  );
} 