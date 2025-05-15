"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/loralab.module.css";
import { SUPABASE_URL } from "@/constants";

interface AgentResponse {
  response: string;
  conversation_id: string;
}

export default function Loralab() {
  // State for the current prompt and generated response
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    text: string[];
    images?: string[];
  } | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  // Suggested questions that will rotate in the placeholder
  const suggestedQuestions = [
    "What is LoraLab?",
    "What did Elios do at LoraLab?",
    "What are the KPIs of LoraLab?",
    "What tech stack was used?",
    "What are the key features?"
  ];
  
  // Reference to the prompt input
  const promptInputRef = useRef<HTMLInputElement>(null);
  
  // Function to select a random video
  const selectRandomVideo = () => {
    const videos = [
      `${SUPABASE_URL}/videos/loralab/loralab_content_1.mp4`,
      `${SUPABASE_URL}/videos/loralab/loralab_content_2.mp4`,
      `${SUPABASE_URL}/videos/loralab/loralab_content_3.mp4`,
    ];
    const randomIndex = Math.floor(Math.random() * videos.length);
    setVideoSrc(videos[randomIndex]);
  };
  
  // Function to get a random desktop screenshot
  const getRandomScreenshot = () => {
    const screenshots = [
      `${SUPABASE_URL}/images/loralab/loralab_content_2.webp`,
      `${SUPABASE_URL}/images/loralab/loralab_content_3.webp`,
      `${SUPABASE_URL}/images/loralab/loralab_content_4.webp`,
    ];
    return screenshots[Math.floor(Math.random() * screenshots.length)];
  };
  
  // Rotate through placeholder suggestions
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % suggestedQuestions.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(intervalId);
  }, [suggestedQuestions.length]);
  
  // Auto-focus the input on component mount and select a random video
  useEffect(() => {
    if (promptInputRef.current) {
      promptInputRef.current.focus();
    }
    selectRandomVideo();
  }, []);

  // Function to call LoraLab Agent API
  const callLoraLabAgent = async (userQuery: string) => {
    try {
      setAgentError(null);
      setIsGenerating(true);
      
      const response = await fetch('https://web-production-4c62.up.railway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userQuery,
          agent_type: "loralab",
          conversation_id: conversationId
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data: AgentResponse = await response.json();
      
      // Save conversation ID for follow-up queries
      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }
      
      // Process the response with a random screenshot
      setGeneratedContent({
        title: "LoraLab AI Assistant",
        text: data.response.split('\n\n').filter(paragraph => paragraph.trim() !== ''),
        images: [getRandomScreenshot()]
      });
      
    } catch (error) {
      console.error("Error calling LoraLab agent:", error);
      setAgentError("Unable to connect to the LoraLab agent. Please try again later.");
      
      // Set generic error response instead of using preset prompts
      setGeneratedContent({
        title: "Connection Error",
        text: ["I'm having trouble connecting to the LoraLab service right now. Please try again in a moment."],
        images: []
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() !== "") {
      // Clear any existing content
      setGeneratedContent(null);
      setIsGenerating(true);
      
      // Always call the agent API
      callLoraLabAgent(prompt);
    }
  };

  return (
    <div className={`${styles.loralabContainer} scroll-override`} style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Header with black background */}
      <header className="p-6 border-b border-slate-800 bg-black sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <Image 
                src={`${SUPABASE_URL}/images/loralab/logo.png`}
                alt="LoraLab Logo" 
                width={24} 
                height={24} 
                className="rounded-full" 
              />
            </div>
            <span className="text-xl font-bold">LoraLab</span>
          </div>

          {/* Visit website button */}
          <a 
            href="https://loralab.xyz" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-4 py-2 bg-white !text-black font-bold rounded-full hover:bg-gray-100 transition-colors text-sm shadow-sm"
            style={{ color: 'black' }}
          >
            <span className="text-black">Visit the website</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block text-black"
              style={{ color: 'black' }}
            >
              <path 
                d="M13 3L16.293 6.293L9.293 13.293L10.707 14.707L17.707 7.707L21 11V3H13Z" 
                fill="black"
              />
              <path 
                d="M19 19H5V5H12L10 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21H19C20.103 21 21 20.103 21 19V14L19 12V19Z" 
                fill="black"
              />
            </svg>
          </a>
        </div>
      </header>
      
      {/* Main content with all black background */}
      <div className={styles.contentContainer}>
        <div className="w-full max-w-3xl mx-auto animate-fade-in-up">
          {/* Prompt input with dynamic placeholder */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative shadow-lg">
              <input
                ref={promptInputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Try asking: "${suggestedQuestions[placeholderIndex]}"`}
                className="w-full p-4 pr-32 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            </div>
            {conversationId && (
              <div className="mt-1 text-xs text-slate-400">
                Conversation active - your follow-up questions will be in context
              </div>
            )}
          </form>
          
          {/* Promotional Video - Mobile 9:16 format */}
          {!generatedContent && !isGenerating && videoSrc && (
            <div className="mt-6 mb-10 relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 hover:border-slate-500 transition-colors">
              <div className="mx-auto max-w-[350px] relative">
                <div className="aspect-[9/16] relative">
                  <video 
                    src={videoSrc} 
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Experience LoraLab</h3>
                    <p className="text-xs text-slate-300">AI-powered content generation</p>
                  </div>
                  <button 
                    onClick={selectRandomVideo}
                    className="absolute bottom-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    title="Show another video"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Generated content */}
          {isGenerating && (
            <div className="mt-6 p-8 bg-slate-900 rounded-lg border border-slate-800 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="animate-pulse h-3 w-3 rounded-full bg-blue-500"></div>
                <p className="text-slate-400">Generating response{conversationId ? " (continuing conversation)" : ""}...</p>
              </div>
              <div className="h-40 flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
          
          {agentError && (
            <div className="mt-2 mb-4 px-4 py-2 bg-red-900/30 border border-red-700 rounded-md text-red-300 text-sm">
              {agentError}
            </div>
          )}
          
          {generatedContent && !isGenerating && (
            <div className="mt-6 p-8 bg-slate-900 rounded-lg border border-slate-800 shadow-lg transition-all">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 inline-block text-transparent bg-clip-text">{generatedContent.title}</h2>
              
              <div className="mb-8 space-y-4">
                {generatedContent.text.map((line, index) => (
                  <p key={index} className="text-slate-100 text-base leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              
              {generatedContent.images && generatedContent.images.length > 0 && (
                <div className="mt-8">
                  {generatedContent.images.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border border-slate-700 bg-black shadow-md hover:shadow-lg transition-all hover:scale-[1.01] duration-300">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={src}
                          alt={`LoraLab interface ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Back link at bottom left */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link href="/" className="font-mono text-sm underline text-slate-300 hover:text-white transition-colors">
          Back to home
        </Link>
      </div>
    </div>
  );
} 