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
  
  // Pre-set prompts and their responses with enhanced content
  const presetPrompts = [
    { 
      id: "what-is", 
      label: "What is LoraLab?", 
      response: {
        title: "LoraLab: AI Content Generation Platform",
        text: [
          "LoraLab is a sophisticated AI content creation platform enabling users to generate and customize AI models, images, and videos.",
          "The platform leverages state-of-the-art machine learning technologies for image generation, LoRA (Low-Rank Adaptation) model training, video creation, and voice cloning.",
          "Users can train custom AI models from their own images, generate high-quality visuals, and transform static images into videos with motion effects.",
          "The platform features a clean, modern interface with intuitive workflows for training and content generation."
        ],
        images: [`${SUPABASE_URL}/images/loralab/screenshot1.png`]
      }
    },
    { 
      id: "what-i-did", 
      label: "My Role", 
      response: {
        title: "My Role & Tech Stack",
        text: [
          "Founded and developed LoraLab from scratch as a full-stack solution, serving as both technical lead and product architect.",
          "Frontend: Next.js 14 with React, App Router architecture, Tailwind CSS, Zustand for state management, and Framer Motion for animations.",
          "Backend: FastAPI (Python), Supabase for database and auth, AWS Lambda for serverless deployment, Docker for containerization.",
          "AI Integration: Replicate API for model training/inference, API-based integrations with state-of-the-art AI models.",
          "Payment Processing: Implemented Stripe for subscription management and credit purchases, plus blockchain wallet connections for MultiversX and Solana crypto payments.",
          "Implemented asynchronous architecture for handling resource-intensive AI operations while maintaining responsive performance.",
          "Designed and built a credit-based system for metering platform usage with flexible payment options across fiat and cryptocurrency.",
          "Created a comprehensive API for developers, enabling seamless integration of AI-generated content into applications."
        ],
        images: [`${SUPABASE_URL}/images/loralab/screenshot2.png`]
      }
    },
    { 
      id: "kpis", 
      label: "Key Performance Indicators", 
      response: {
        title: "LoraLab Growth & Success",
        text: [
          "5,000+ active users across the platform with steady month-over-month growth.",
          "$1,000+ Monthly Recurring Revenue (MRR) through subscription model with multiple pricing tiers.",
          "100,000+ AI assets generated through the platform.",
          "Thousands of views on promotional content across social media channels.",
          "Successfully launched API access for developers with enterprise clients integration.",
          "Strong user retention with 40% of users returning weekly for new content generation.",
          "Processed transactions in both fiat (via Stripe) and cryptocurrency (via MultiversX and Solana wallets)."
        ],
        images: [`${SUPABASE_URL}/images/loralab/screenshot3.png`]
      }
    },
    { 
      id: "key-features", 
      label: "Key Features", 
      response: {
        title: "Platform Capabilities",
        text: [
          "Custom AI Model Training: Users can train their own LoRA models from personal image collections.",
          "High-Quality Image Generation: Generate detailed visuals using fine-tuned models with prompt enhancement.",
          "Video Creation: Transform static images into videos with dynamic motion effects.",
          "Voice Cloning: Generate voiceovers and audio content with customizable voices.",
          "Public Gallery: Explore community creations and trending models.",
          "Multi-Currency Payments: Credit purchases via Stripe, MultiversX, and Solana blockchain integration.",
          "Credits System: Flexible usage-based pricing model for different generation capabilities.",
          "Advanced Processing Pipeline: Asynchronous task processing with status notifications.",
          "Robust API: Comprehensive endpoints for developers with authentication and usage tracking."
        ],
        images: [
          `${SUPABASE_URL}/images/loralab/screenshot1.png`,
          `${SUPABASE_URL}/images/loralab/screenshot2.png`
        ]
      }
    },
    { 
      id: "screenshots", 
      label: "Show screenshots", 
      response: {
        title: "LoraLab Platform Interface",
        text: [
          "The LoraLab platform features an intuitive interface for AI content generation.",
          "The modern UI includes model training dashboards, generation workspaces, and media galleries.",
          "Users can easily input prompts, adjust parameters, and generate high-quality outputs.",
          "The responsive design is optimized for both desktop and mobile experiences.",
          "Real-time generation status indicators provide feedback during processing.",
          "Wallet connection interfaces support both traditional payment methods and crypto transactions."
        ],
        images: [
          `${SUPABASE_URL}/images/loralab/screenshot1.png`,
          `${SUPABASE_URL}/images/loralab/screenshot2.png`,
          `${SUPABASE_URL}/images/loralab/screenshot3.png`
        ]
      }
    }
  ];

  // Reference to the prompt input
  const promptInputRef = useRef<HTMLInputElement>(null);
  
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
      
      // Process the response
      setGeneratedContent({
        title: "LoraLab AI Assistant",
        text: data.response.split('\n\n').filter(paragraph => paragraph.trim() !== ''),
        images: [`${SUPABASE_URL}/images/loralab/screenshot1.png`]
      });
      
    } catch (error) {
      console.error("Error calling LoraLab agent:", error);
      setAgentError("Unable to connect to the LoraLab agent. Using fallback response.");
      
      // Fallback to a preset response if API call fails
      setGeneratedContent(presetPrompts[0].response);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Function to handle generating content
  const generateContent = (selectedPrompt: string) => {
    // Clear any existing content
    setGeneratedContent(null);
    setIsGenerating(true);
    
    // Find the matching preset prompt
    const matchingPrompt = presetPrompts.find(p => 
      p.label.toLowerCase().includes(selectedPrompt.toLowerCase()) || 
      selectedPrompt.toLowerCase().includes(p.id)
    );
    
    if (matchingPrompt) {
      setPrompt(matchingPrompt.label);
      
      // For preset prompts, use the predefined responses
      setTimeout(() => {
        setIsGenerating(false);
        setGeneratedContent(matchingPrompt.response);
      }, 1500);
    } else {
      // For custom prompts, call the LoraLab agent API
      callLoraLabAgent(selectedPrompt);
    }
  };
  
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() !== "") {
      generateContent(prompt);
    }
  };
  
  // Function to handle preset prompt selection
  const handlePresetClick = (presetLabel: string) => {
    setPrompt(presetLabel);
    generateContent(presetLabel);
  };

  // Auto-focus the input on component mount
  useEffect(() => {
    if (promptInputRef.current) {
      promptInputRef.current.focus();
    }
  }, []);

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
          {/* Prompt input */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative shadow-lg">
              <input
                ref={promptInputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about LoraLab..."
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
          
          {/* Preset prompts */}
          <div className="mb-8 flex flex-wrap gap-2">
            {presetPrompts.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset.label)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm rounded-full transition-colors border border-slate-700 hover:border-slate-600"
              >
                {preset.label}
              </button>
            ))}
          </div>
          
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
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {generatedContent.images.map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border border-slate-700 bg-black shadow-md hover:shadow-lg transition-all hover:scale-[1.02] duration-300">
                      <div className="aspect-video relative">
                        <Image
                          src={src}
                          alt={`LoraLab screenshot ${index + 1}`}
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