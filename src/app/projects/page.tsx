'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Project, projects } from "./data/projects";
import ProjectFolder from "./components/ProjectFolder";
import ProjectModal from "./components/ProjectModal";
import TextFileModal from "./components/TextFileModal";
import ImageFileModal from "./components/ImageFileModal";
import CustomCursor from "./components/CustomCursor";
import ProjectFiles from "./components/ProjectFiles";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [showFiles, setShowFiles] = useState(false);
  
  // New state for text and image file modals
  const [isTextFileOpen, setIsTextFileOpen] = useState(false);
  const [isImageFileOpen, setIsImageFileOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedFolderId(project.id);
    // Single click now shows files instead of selecting
    setShowFiles(true);
    setSelectedProject(project);
  };

  const handleProjectOpen = (project: Project) => {
    // Double click opens the modal with project details
    setIsModalOpen(true);
    setSelectedProject(project);
  };
  
  const handleOpenTextFile = (project: Project, fileId: string) => {
    setSelectedProject(project);
    setSelectedFileId(fileId);
    setIsTextFileOpen(true);
  };
  
  const handleOpenImageFile = (project: Project, fileId: string) => {
    setSelectedProject(project);
    setSelectedFileId(fileId);
    setIsImageFileOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Keep the folder selected even after closing the modal
  };
  
  const closeTextFileModal = () => {
    setIsTextFileOpen(false);
  };
  
  const closeImageFileModal = () => {
    setIsImageFileOpen(false);
  };

  // Clear selection when clicking on empty space in the content area
  const handleContentAreaClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedFolderId(null);
      setShowFiles(false);
    }
  };

  // Go back to folder view
  const handleBackToFolders = () => {
    setShowFiles(false);
    setSelectedFolderId(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-8 bg-[#F8F1E7] relative overflow-auto">
      {/* Custom cursor */}
      <CustomCursor />
      
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto pt-16 sm:pt-20">
        {/* MacOS Finder-style Window */}
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          {/* Finder Toolbar */}
          <div className="bg-[#F6F6F6] h-12 border-b border-gray-200 flex items-center px-4">
            {/* Window Controls */}
            <div className="flex space-x-2 items-center">
              <Link href="/">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] cursor-pointer hover:opacity-80 transition-opacity" 
                     aria-label="Go to home page">
                </div>
              </Link>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
            </div>
            
            {/* Toolbar Title and navigation */}
            <div className="ml-4 flex-grow font-mono text-sm text-gray-700 flex items-center overflow-hidden">
              {showFiles && (
                <button 
                  onClick={handleBackToFolders}
                  className="mr-2 text-blue-500 hover:text-blue-700 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <span className="truncate">
                {showFiles ? (
                  <>
                    <span 
                      className="cursor-pointer hover:text-blue-500"
                      onClick={handleBackToFolders}
                    >
                      Projects
                    </span>
                    {selectedFolderId && ` > ${projects.find(p => p.id === selectedFolderId)?.title}`}
                  </>
                ) : (
                  "Projects"
                )}
              </span>
            </div>
          </div>
          
          {/* Finder Content */}
          <div className="flex h-[500px] sm:h-[600px]">
            {/* Sidebar */}
            <div className="w-48 bg-[#F6F6F6] border-r border-gray-200 p-3 hidden sm:block">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase pl-2">FAVORITES</div>
              <Link href="/" className="text-gray-700 flex items-center p-2 rounded hover:bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <div className="text-gray-700" style={{ color: 'rgb(55, 65, 81)', textShadow: '0 0 0 rgb(55, 65, 81)' }}>Home</div>
              </Link>
              <div 
                onClick={handleBackToFolders}
                className={`text-sm text-black flex items-center p-2 rounded ${showFiles ? 'hover:bg-blue-100' : 'bg-blue-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Projects
              </div>
              {showFiles && selectedProject && (
                <div className="text-sm text-black flex items-center p-2 rounded bg-blue-100 ml-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  {selectedProject.title}
                </div>
              )}
            </div>
            
            {/* Content Area */}
            <div 
              className="flex-1 p-6 bg-white overflow-auto"
              onClick={handleContentAreaClick}
            >
              {selectedFolderId && showFiles ? (
                <ProjectFiles 
                  project={projects.find(p => p.id === selectedFolderId)!} 
                  onOpenTextFile={handleOpenTextFile}
                  onOpenImageFile={handleOpenImageFile}
                />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {projects.map((project) => (
                    <ProjectFolder 
                      key={project.id}
                      project={project}
                      onClick={handleProjectClick}
                      onDoubleClick={handleProjectOpen}
                      isSelected={selectedFolderId === project.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Finder Status Bar */}
          <div className="bg-[#F6F6F6] h-8 border-t border-gray-200 flex items-center px-4 text-xs text-gray-500 justify-between">
            <div>
              {selectedFolderId && showFiles 
                ? selectedFolderId === 'tournament-bot' ? '4 items' : selectedFolderId === 'vinted-uae' ? '3 items' : '5 items' 
                : `${projects.length} items`}
            </div>
            <div>42.0 GB available</div>
          </div>
        </div>
      </div>

      {/* Mobile home link */}
      <div className="fixed bottom-6 left-6 z-50 sm:hidden">
        <Link href="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="ml-1 text-sm font-mono">Home</span>
        </Link>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
      
      {/* Text File Modal */}
      <TextFileModal
        isOpen={isTextFileOpen}
        onClose={closeTextFileModal}
        project={selectedProject}
        fileId={selectedFileId}
      />
      
      {/* Image File Modal */}
      <ImageFileModal
        isOpen={isImageFileOpen}
        onClose={closeImageFileModal}
        project={selectedProject}
        fileId={selectedFileId}
      />
    </main>
  );
} 