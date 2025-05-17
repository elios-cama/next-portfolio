import React, { useState, useEffect } from 'react';
import { Project } from '../data/projects';
import { SUPABASE_URL } from '@/constants';

interface TextFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  fileId: string | null;
}

export default function TextFileModal({ isOpen, onClose, project, fileId }: TextFileModalProps) {
  const [mdContent, setMdContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch markdown content from Supabase URL when needed
    async function fetchMarkdownContent() {
      if (!isOpen || !project || !fileId) return;
      
      if (fileId === 'readme' && project.id === 'vinted-uae') {
        try {
          setIsLoading(true);
          setError(null);
          const response = await fetch(`${SUPABASE_URL}/images/projects/yabi/yabi.md`);
          if (!response.ok) {
            throw new Error(`Failed to fetch markdown: ${response.status}`);
          }
          const text = await response.text();
          setMdContent(text);
        } catch (err) {
          console.error('Error fetching markdown:', err);
          setError('Failed to load markdown content');
          setMdContent(null);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchMarkdownContent();
  }, [isOpen, project, fileId]);

  if (!isOpen || !project || !fileId) return null;

  // Generate content based on fileId
  const getFileContent = () => {
    // If we have loaded MD content from Supabase, use it
    if (fileId === 'readme' && project.id === 'vinted-uae' && mdContent) {
      return mdContent;
    }
    
    if (fileId === 'readme') {
      if (project.id === 'tournament-bot') {
        return `# Project: Telegram Tennis Tournament Bot

## 1. Project Vision & Value Proposition:

**What it is:** A sophisticated Telegram bot designed to streamline and automate the entire lifecycle of offline tennis tournaments in Dubai. It serves as a central hub for players and organizers, simplifying registration, payment, scheduling, score reporting, and real-time standings.

**Collaboration & Context:** Developed in partnership with a business associate deeply embedded in Dubai's tennis community, ensuring the bot directly addresses real-world tournament needs and pain points.

**Value to Users & Organizers:**
* **For Players:** Easy registration, secure payment options (Telegram Stars & fiat via Ziina), clear match scheduling, instant score updates, and engaging community features like photo sharing.
* **For Organizers:** Automated player management, simplified payment collection and verification, efficient match scheduling tools, automated standings calculation, and direct communication channels with participants. Reduces administrative overhead significantly.

**Value to My Portfolio:**
* Demonstrates ability to build a complete, real-world application with complex business logic from ideation to potential deployment.
* Showcases proficiency in integrating diverse third-party services (Telegram API, payment gateways, cloud database).
* Highlights skills in asynchronous programming, API development, and database management within a practical, user-facing project.
* Illustrates experience in building community-focused tools with a clear use case and target audience.

## 2. Core Functionality & Features:

* **Player Management:** Secure registration, skill level tracking (NTRP), and automated grouping (Platinum, Gold, Silver).
* **Tournament Automation:** Round-based structure, dynamic match scheduling assistance, automated score tracking, and real-time leaderboard updates.
* **Dual Payment System:**
  * **Telegram Stars:** Seamless in-app payments via Telegram's native system.
  * **Ziina (Fiat AED):** Integration with a UAE-based payment gateway for local currency payments.
  * **Webhook-driven:** Real-time payment verification and automated registration confirmation.
* **Interactive Match Experience:** Player-reported scores, score verification mechanisms, and automatic point/standings calculation.
* **Communication Hub:** Templated notifications for players, organizer alerts for critical events (registrations, payments), and match scheduling reminders.
* **Community Engagement:** Tournament photo collection and sharing features.
* **Administrative Backend:** Admin commands for comprehensive tournament management, player notifications, and reporting.

## 3. Technical Architecture & Stack:

* **Language & Paradigm:**
  * **Python:** Core application logic.
  * **Asynchronous Programming (asyncio):** Essential for handling concurrent Telegram interactions and I/O-bound operations efficiently.
* **Bot Framework:**
  * **python-telegram-bot:** Robust library for all Telegram API interactions (commands, messages, inline keyboards, payments).
* **Web Services & API:**
  * **FastAPI:** High-performance Python web framework used to create webhook endpoints for Telegram updates and payment provider notifications (Ziina). Ensures reliable, real-time data exchange.
* **Database:**
  * **Supabase (PostgreSQL):** Serverless cloud database for persistent storage of all user data, tournament structures (rounds, groups, matches), scores, payments, and pending registrations. Leverages its relational capabilities for data integrity.
* **Payment Integrations:**
  * **Telegram Payments API:** Direct integration for Star-based payments.
  * **Ziina API:** Integration for AED fiat payments, including secure webhook handling for payment confirmation.
* **Deployment Strategy:**
  * **Uvicorn/Gunicorn:** ASGI servers for running the FastAPI web application in production.
  * **Procfile-based:** Configured for easy deployment on PaaS platforms (e.g., Heroku, Railway).
  * **Environment Variables:** Secure management of API keys, database credentials, and other sensitive configurations.
  * **Separation of Concerns:** Architected with distinct processes for the web server (handling webhooks) and the bot worker (processing Telegram updates), enabling better scalability and resilience.

## 4. Key Learnings & Technical Achievements:

* **Full-Stack Bot Development:** Successfully designed and implemented a feature-rich bot handling everything from user interaction to backend logic, database management, and external API integrations.
* **Payment Gateway Integration:** Mastered the integration of two distinct payment systems (Telegram's native and a third-party fiat gateway), including secure webhook handling and real-time verification.
* **Asynchronous Python:** Gained deep practical experience with \`asyncio\` for building responsive and scalable applications that interact with external APIs.
* **API Design with FastAPI:** Developed and deployed robust webhook endpoints capable of handling real-time updates from multiple sources.
* **Serverless Database Management:** Leveraged Supabase for its ease of use, scalability, and powerful PostgreSQL features, designing a relational schema to support complex tournament logic.
* **Real-World Problem Solving:** Translated the complex needs of offline tournament organization into a functional and automated digital solution.
* **Secure Application Development:** Implemented secure practices for handling API keys, user data, and payment information.`;
      } else if (project.id === 'vinted-uae') {
        // Fallback content if fetch fails
        return `# YABI

## Overview
A marketplace application for buying and selling secondhand clothing in the UAE, similar to Vinted.

The app includes features like user authentication, item listings with images, search functionality, messaging between users, and secure payment processing. Designed with a clean, user-friendly interface optimized for mobile devices.

## Technical Implementation
- Built with Flutter for cross-platform mobile support
- Firebase for authentication and real-time database
- Cloud Functions for serverless backend operations
- Stripe API integration for secure payments

## Key Features
- User profile management
- Image-based listing creation
- Search and filter functionality
- In-app messaging
- Secure payment processing
- Rating and review system
`;
      } else {
        return `# ${project.title} README

## Overview
${project.description}

## Installation

1. Clone the repository
   \`\`\`
   git clone https://github.com/elios-cama/${project.id}.git
   \`\`\`

2. Install dependencies
   \`\`\`
   npm install
   \`\`\`

3. Run the project
   \`\`\`
   npm start
   \`\`\`

## Features
- Feature 1: Description of feature 1
- Feature 2: Description of feature 2
- Feature 3: Description of feature 3

## Technology Stack
${project.techStack.join(', ')}

## License
MIT © Elios Cama
`;
      }
    } else if (fileId === 'notes') {
      if (project.id === 'tournament-bot') {
        return `DEVELOPMENT NOTES - ${project.title}

TODO:
- Implement webhook endpoint for Ziina payment verification
- Add admin commands for tournament result exports
- Create detailed documentation for tournament organizers
- Fix bug in match scheduling algorithm 
- Add unit tests for payment processing

IDEAS:
- Add support for doubles tournaments
- Implement ELO rating system for player skill tracking
- Create a web dashboard for tournament organizers
- Add tournament statistics and player performance metrics
- Consider implementing a spectator mode for non-participants

COMPLETED:
- Initial bot command structure
- Player registration flow with NTRP rating selection
- Tournament group creation and management
- Score reporting and validation
- Basic admin commands for tournament management
- Integration with Telegram payments API

Last updated: May 12, 2025
`;
      } else {
        return `DEVELOPMENT NOTES - ${project.title}

TODO:
- Implement responsive design for mobile devices
- Fix navigation bug in the settings page
- Add unit tests for the auth flow
- Optimize image loading for better performance

IDEAS:
- Consider adding dark mode
- Explore integration with third-party APIs
- Implement analytics to track user behavior

COMPLETED:
- Initial project setup
- Basic user authentication
- Core functionality implementation
- UI design and implementation

Last updated: May 10, 2025
`;
      }
    } else {
      return 'File content not available.';
    }
  };

  // Get file name
  const getFileName = () => {
    if (project.id === 'tournament-bot') {
      if (fileId === 'readme') return 'README.md';
    } else if (project.id === 'vinted-uae') {
      if (fileId === 'readme') return 'README.md';
    } else {
      if (fileId === 'readme') return 'README.txt';
      if (fileId === 'notes') return 'notes.txt';
    }
    return 'unknown.txt';
  };

  // Check if the file is markdown
  const isMarkdownFile = () => {
    const fileName = getFileName();
    return fileName.endsWith('.md');
  };

  // Render markdown content with some basic styling
  const renderMarkdown = (content: string) => {
    // Split content by lines and process
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Heading styles (# Heading)
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{line.substring(4)}</h3>;
      }
      // Bold text (**text**)
      else if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="my-2">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.substring(2, part.length - 2)}</strong>;
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      }
      // List items
      else if (line.startsWith('* ')) {
        return <li key={index} className="ml-6 my-1 list-disc">{line.substring(2)}</li>;
      }
      // Code block
      else if (line.startsWith('```')) {
        return null; // Just a delimiter, actual code will be handled separately
      }
      // Empty line
      else if (line.trim() === '') {
        return <br key={index} />;
      }
      // Regular paragraph
      else {
        return <p key={index} className="my-2">{line}</p>;
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* Modal container - Text editor style */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl max-h-[80vh] animate-scale-in">
        {/* Header with file name and close button */}
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-blue-600 mr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className="w-6 h-6" 
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
            </div>
            <h3 className="font-mono text-base font-medium text-black">{getFileName()}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Text content area with monospace font */}
        <div className="overflow-y-auto p-6 max-h-[calc(80vh-64px)] bg-white">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">Loading content...</p>
            </div>
          ) : error ? (
            <div className="text-red-500">
              <p>Error loading content: {error}</p>
            </div>
          ) : isMarkdownFile() ? (
            <div className="markdown-content font-sans text-base leading-relaxed text-gray-900 w-full">
              {renderMarkdown(getFileContent())}
            </div>
          ) : (
            <pre className="font-mono text-base leading-relaxed whitespace-pre-wrap text-gray-900 w-full">
              {getFileContent()}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
} 