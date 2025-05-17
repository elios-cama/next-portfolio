"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles/tada-journey.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define types for milestone content
type MilestoneImage = {
  url: string;
  alt: string;
};

interface MilestoneType {
  id: number;
  title: string;
  date: string;
  iconLabel: string;
  position: 'left' | 'right';
  description: string;
  imageUrl: string;
  detailedContent: {
    title: string;
    description: string;
    challenges?: string[];
    achievements?: string[];
    techStack?: string[];
    images?: MilestoneImage[];
  };
}

export default function TadaJourney() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample milestones data with actual image paths
  const milestones = useMemo<MilestoneType[]>(() => [
    {
      id: 1,
      title: "Internship Kick-off (FR)",
      date: "February 2024",
      iconLabel: "1",
      position: 'right',
      description: "Beginning of internship in France",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/start.png",
      detailedContent: {
        title: "Beginning the Journey",
        description: "Joined Ta-da as a Flutter Developer intern in France, immediately contributing to a major UI refactor and core feature development.",
        challenges: [
          "Rapid onboarding to a large Flutter codebase",
          "Collaborating on UI implementation from design specs",
          "Understanding existing data models"
        ],
        achievements: [
          "Profile Page Redesign: Implemented modernized user profile with enhanced visual elements like gradients, redesigned energy level and wallet info widgets",
          "Energy Widget Creation: Designed and built the first version of the dynamic user energy widget with 20 distinct EnergyUnit widgets",
          "Implemented a reusable CountdownTimerWidget with Riverpod Family provider for efficient state management"
        ],
        techStack: ["Flutter", "Dart", "Riverpod", "CustomPainter", "Easy Localization"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/start.png", alt: "Flutter codebase" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/mock.png", alt: "First feature implementation" }
        ]
      }
    },
    {
      id: 2,
      title: "Dubai Relocation & Full-Time",
      date: "May 2024",
      iconLabel: "2",
      position: 'left',
      description: "Moving to Dubai, full-time contract",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/burj.png",
      detailedContent: {
        title: "Dubai Relocation & Full-Time Contract",
        description: "Relocated to Dubai and transitioned to a full-time role, marking an exciting new chapter in my journey with Ta-da.",
        challenges: [
          "Adapting to a new cultural and professional environment",
          "Balancing relocation logistics with ongoing development work"
        ],
        achievements: [
          "Successfully negotiated and secured a full-time developer contract",
          "Seamlessly transitioned from intern to on-site full-time developer",
          "Quickly integrated into the Dubai tech ecosystem"
        ],
        techStack: ["Flutter", "Dart", "Firebase"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/burj.png", alt: "Dubai office" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/mock.png", alt: "Team meeting" }
        ]
      }
    },
    {
      id: 3,
      title: "App V2: Full Refactor",
      date: "July 2024",
      iconLabel: "3",
      position: 'right',
      description: "Complete app refactorization with new designs",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/mock.png",
      detailedContent: {
        title: "App V2: Major Refactorization & Feature Expansion",
        description: "Led a complete overhaul of the app's architecture to improve scalability, maintainability, and developer workflow, while implementing significant new features and task types.",
        challenges: [
          "Complete architectural refactoring while maintaining app functionality",
          "Developing complex UI for new task types",
          "Implementing social media integration under tight deadlines"
        ],
        achievements: [
          "Major App Refactorisation: Migrated to a modular structure with Melos mono-repo, separating concerns into distinct packages",
          "Streamlined Dev Workflow: Implemented Melos scripts for builds, asset generation, and translations",
          "Modernized State & Routing: Led adoption of Riverpod for all state management and GoRouter for navigation",
          "Image Classification Tasks: Developed fluid UI/UX with DraggableSheetScaffold and Hero animations",
          "Social Engagement Tasks: Took ownership of Twitter engagement features using Twitter API and OAuth 1a."
        ],
        techStack: ["Flutter", "Dart", "Melos", "Riverpod", "GoRouter", "OAuth", "WebView", "Figma"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/mock.png", alt: "App UI before refactor" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/mock.png", alt: "App UI after refactor" }
        ]
      }
    },
    {
      id: 4,
      title: "Blockchain Lead (EGLD)",
      date: "August 2024",
      iconLabel: "4",
      position: 'left',
      description: "Taking lead on blockchain integration (Rust collaboration)",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/token.svg",
      detailedContent: {
        title: "Blockchain Integration & Technical Leadership",
        description: "As technical lead, I architected and implemented the core Web3 functionalities for the Ta-da mobile app, focusing on secure wallet management and seamless interaction with MultiversX smart contracts. This was pivotal for enabling the app's token economy and decentralized features.",
        challenges: [
          "Designing a secure non-custodial wallet system within a consumer mobile app",
          "Implementing complex cryptographic operations and secure key storage",
          "Engineering smart contract interactions with precise data serialization requirements"
        ],
        achievements: [
          "Secure Wallet Architecture: Developed end-to-end flow for wallet creation/import using BIP39 for 24-word seed phrases, ED25519 hierarchical deterministic key derivation with MultiversX path and platform-specific encrypted storage",
          "Advanced Verification: Implemented 3-word verification process for seed backup.",
          "Direct Transactions: Engineered secure local transaction signing with biometric authentication, correct field ordering, and Base64 encoding for ESDT token transfers",
          "Meta-Transactions: Architected gasless-like experiences by implementing complex meta-transactions that query smart contract state, construct precise byte-encoded payloads (BigInt amounts, timestamps, nonces), and relay signed messages to backend services",
          "Cross-Disciplinary Collaboration: Worked closely with Rust smart contract developer through workshops to ensure seamless integration between mobile front-end and on-chain backend"
        ],
        techStack: ["Flutter", "Dart", "MultiversX", "BIP39", "ED25519", "Bech32", "Smart Contracts", "Biometric Authentication", "BigInt", "ABI Encoding"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/token.svg", alt: "Blockchain integration diagram" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/t_bond.png", alt: "Wallet connection flow" }
        ]
      }
    },
    {
      id: 5,
      title: "Gamification Sprint (Team of 2)",
      date: "September 2024",
      iconLabel: "5",
      position: 'right',
      description: "Reduced team, focus on gamification features",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/gamification.png",
      detailedContent: {
        title: "Gamification Features",
        description: "With the design team on leave and the front-end team reduced to just two developers, I spearheaded the implementation of comprehensive gamification elements to boost user engagement and retention, taking on significant UI/UX responsibilities beyond typical development.",
        challenges: [
          "Developing complex animation sequences with limited resources",
          "Creating engaging reward systems that incentivize continued usage",
          "Balancing technical limitations with desired user experience",
          "Handling both development and UI/UX design with designer on leave"
        ],
        achievements: [
          "Tiered Lootbox System: Designed and implemented four distinct lootbox types (Common, Rare, Epic, Legendary) with unique visuals, animations, and reward values",
          "Immersive Animation Sequence: Created multi-stage opening animations with visual effects (shaking, pulsing, glowing), synchronized sound effects, and haptic feedback",
          "Reward Visualization: Developed dynamic reward cards with gradient text, glow effects, and progressive revealing of content to build excitement",
          "Shop Enhancement: Implemented time-limited discount campaigns with countdown timers, categorized items by functionality, and added interactive purchase animations",
          "UI/UX Leadership: Stepped up to handle UI/UX design decisions during designer absence, ensuring visual consistency and user engagement"
        ],
        techStack: ["Flutter", "Dart", "Animation Controllers", "Rive Animations", "CustomPainter", "Haptic Feedback", "Audio Services"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/gamification.png", alt: "Gamification UI elements" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/mock.png", alt: "Rewards system" }
        ]
      }
    },
    {
      id: 6,
      title: "Multi-Platform Expansion",
      date: "December 2024",
      iconLabel: "6",
      position: 'left',
      description: "Web versions (TG Mini-App, TON), Solana mobile",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/ton.webp",
      detailedContent: {
        title: "Cross-Platform Blockchain Expansion",
        description: "Spearheaded the strategic expansion of Ta-da from a Flutter mobile app to multiple web platforms, leveraging our existing user base of 150k Telegram users and implementing sophisticated wallet abstraction to simplify the blockchain experience for Web2 users.",
        challenges: [
          "Creating seamless JavaScript-to-Dart bridges for Web3 libraries",
          "Developing unified UX across diverse platforms (Telegram, web, mobile)",
          "Implementing secure wallet abstraction for non-crypto-native users",
          "Ensuring consistent functionality across TON and Solana blockchains"
        ],
        achievements: [
          "Telegram Mini-App: Deployed a web version of our mobile app as a Telegram Mini-App, successfully redirecting 150k users from our Tap-2-Earn platform",
          "TON Integration: Implemented TonConnect with JS-to-Dart bridge, compliant with TEP-74 token standard, featuring secure transaction handling with nonce-based message signing",
          "Solana Ecosystem: Integrated Particle Network SDK to enable social login wallet abstraction (Google/Apple OAuth), allowing web2 users to interact with blockchain without managing seed phrases",
          "Cross-Chain Architecture: Designed a modular system supporting both TON and Solana blockchains through a unified interface with chain-specific transaction signing",
          "Security Enhancements: Implemented biometric authentication for transactions, proper message signing protocols, and comprehensive error handling across all platforms"
        ],
        techStack: ["Flutter Web", "JavaScript", "TON", "Solana", "TonConnect UI", "Particle Network SDK", "OAuth", "Telegram Web App JS", "js_util", "Keccak Hashing"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/ton.webp", alt: "Telegram Mini-App" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/t_bond.png", alt: "TON integration" }
        ]
      }
    },
    {
      id: 7,
      title: "Rewards V2 & NFT Lead",
      date: "January 2025",
      iconLabel: "7",
      position: 'right',
      description: "New reward system, NFTs, leading mobile team",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/t_bond.png",
      detailedContent: {
        title: "Vested Reward to NFT Conversion System",
        description: "Architected and implemented a sophisticated rewards-to-NFT conversion and redemption system featuring time-vested T-Bondz NFTs that appreciate in value over time, along with a dedicated web platform for NFT redemption with MultiversX wallet integration.",
        challenges: [
          "Designing a mathematically sound vesting curve model with configurable parameters",
          "Implementing cross-blockchain compatibility between mobile app and web platforms",
          "Building efficient conversion and redemption processes for potentially large sets of rewards",
          "Creating an entirely new web platform focused on NFT redemption with wallet connectivity"
        ],
        achievements: [
          "Rewards to NFT Conversion: Developed an end-to-end system to batch-convert earned rewards into NFTs with vesting parameters, including real-time progress tracking and transaction confirmation",
          "NFT Structure & Encoding: Created a compact binary format for encoding vesting parameters (start/final epochs, maximum value, power factor, minimum percentage) as base64-encoded NFT attributes",
          "Mathematical Value Model: Implemented a non-linear appreciation curve where rewards start at 12.5% and grow according to (elapsed/total)^n power function",
          "NFT Redemption Process: Built a comprehensive redemption workflow that calculates current values based on time elapsed, displays percentage of maximum value, and handles on-chain transactions",
          "Web Redemption Platform: Developed a new dedicated website for NFT redemption with MultiversX wallet connect integration, enabling users to redeem their NFTs outside the mobile app",
          "Rich User Experience: Designed interfaces showing current redemption values, future projections, and percentage increases with intuitive visualizations both in-app and on the web platform"
        ],
        techStack: ["Flutter", "Dart", "MultiversX", "React", "Next.js", "MultiversX Connect", "Binary Encoding", "Mathematical Modeling", "Blockchain Transactions"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/t_bond.png", alt: "NFT showcase" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/token.svg", alt: "Rewards system v2" }
        ]
      }
    },
    {
      id: 8,
      title: "Media Tasks & Dev Lead",
      date: "March 2025",
      iconLabel: "8",
      position: 'left',
      description: "New tasks (photos/videos), alone in team, leading dev team",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/camera.png",
      detailedContent: {
        title: "Advanced Media Capture & Development Leadership",
        description: "As the solo remaining front-end developer and development team lead, I architected and implemented a sophisticated cross-platform media capture system for photos and videos, maintaining consistent user experience across mobile and web platforms while addressing complex technical challenges.",
        challenges: [
          "Creating a unified media capture experience across disparate platforms (iOS, Android, Web)",
          "Handling platform-specific camera behaviors and limitations",
          "Implementing resource-efficient media processing with proper memory management",
          "Leading development direction while being the sole front-end developer"
        ],
        achievements: [
          "Photo Capture Architecture: Developed a clean architecture system with unified experience across platforms, robust error handling with auto-retry logic, careful resource management to prevent leaks, and comprehensive orientation support",
          "Video Recording Functionality: Implemented sophisticated recording with real-time feedback (circular progress indicators, color changes, animated transitions), comprehensive playback controls, and memory-efficient video processing",
          "Cross-Platform Optimization: Created platform-specific implementations for web (Blob URL management, web-friendly error handling) and mobile (native camera settings, permission handling, flash controls) while maintaining consistent UX",
          "Technical Leadership: Led development direction and technical decisions while handling the entire front-end workload, establishing coding standards and architecture patterns for future team members"
        ],
        techStack: ["Flutter", "Dart", "Camera Plugin", "Video Player", "Platform Channels", "Blob URL", "Media Compression", "Error Handling"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/camera.png", alt: "Media upload feature" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/camera.png", alt: "Video player implementation" }
        ]
      }
    },
    {
      id: 9,
      title: "Platform Pivot & Tech Lead",
      date: "May 2025",
      iconLabel: "9",
      position: 'right',
      description: "App sunset, platform pivot to webapp, lead tech",
      imageUrl: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/ending.png",
      detailedContent: {
        title: "Platform Transition Leadership & Knowledge Transfer",
        description: "As Tech Lead, I orchestrated the strategic sunset of the Ta-da mobile application while overseeing the transition to a new web platform, implementing a comprehensive user migration strategy while ensuring clean knowledge transfer to the incoming development team.",
        challenges: [
          "Developing a sunsetting strategy that protected user assets and experience",
          "Transitioning users to the new web platform with minimal friction",
          "Preserving code integrity while streamlining functionality",
          "Ensuring comprehensive knowledge transfer to new developers"
        ],
        achievements: [
          "User Communication System: Designed a strategic notification system with profile page banners highlighting platform evolution, detailed transition timelines, and emphasis on platform achievements (30M+ tasks, 10TB+ data collected)",
          "Functionality Streamlining: Systematically simplified the mobile app by reducing navigation to essential elements, preserving code integrity by commenting rather than removing features, and redirecting user flow to focus on wallet management",
          "Asset Protection: Implemented clear warnings about wallet deprecation, emphasized withdrawal instructions to prevent asset loss, and modified transfer functionality to prioritize withdrawal operations",
          "Web Platform Promotion: Created multiple integration points with direct links to the new platform, distinctive visual elements highlighting migration paths, and specially styled call-to-action buttons",
          "Knowledge Transfer: Led the technical team for the final month, preparing comprehensive documentation, conducting training sessions for incoming developers, and ensuring clean transfer of codebase knowledge and architectural decisions"
        ],
        techStack: ["Flutter", "Dart", "React", "Next.js", "Documentation", "Code Commenting", "Knowledge Management"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/ending.png", alt: "New web platform" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/mock.png", alt: "User migration dashboard" }
        ]
      }
    },
  ], []);

  // Pre-calculate milestone positions
  const milestonePositions = milestones.map((_, index) => {
    // Use consistent spacing since images now have fixed height
    const baseSpacing = 40;
    const increment = 55; // Reduced from 60 for a more compact layout
    return baseSpacing + index * increment; // Spacing in vh units
  });

  // Ensure document can scroll
  useEffect(() => {
    document.documentElement.style.overflow = activeModal ? 'hidden' : 'auto';
    document.body.style.overflow = activeModal ? 'hidden' : 'auto';
    
    // Mark component as loaded after initial render
    if (!isLoaded) {
      setIsLoaded(true);
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [activeModal, isLoaded]);

  // Initialize animations when component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && pathRef.current && containerRef.current && isLoaded) {
      // Clear any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Path animation
      const path = pathRef.current;
      const pathLength = path.getTotalLength();
      
      // Set up initial state - path is invisible
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      
      // Animate the path as we scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
      
      // Animate each milestone marker
      milestones.forEach((milestone) => {
        const markerElement = document.getElementById(`milestone-${milestone.id}`);
        if (markerElement) {
          gsap.fromTo(
            markerElement,
            { 
              opacity: 0,
              x: milestone.position === 'right' ? 100 : -100,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: markerElement,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }
  }, [milestones, isLoaded]);

  const openModal = (id: number) => {
    setActiveModal(id);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Find the active milestone data
  const activeMilestoneData = activeModal 
    ? milestones.find(m => m.id === activeModal) 
    : null;

  return (
    <div className={`${styles.journeyContainer} ${styles.variables}`} ref={containerRef}>
      {/* Gradient background */}
      <div className={styles.gradientBackground}></div>
      
      {/* Additional top gradient */}
      <div className={styles.topGradient}></div>
      
      {/* SVG Journey Path */}
      <div className={styles.pathContainer}>
        <svg 
          className={styles.pathSvg} 
          viewBox="0 0 1000 8000" 
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Add a more modern gradient for the path */}
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#BF00FF" />
              <stop offset="100%" stopColor="#6602CC" />
            </linearGradient>
          </defs>
          
          {/* Journey path with improved gradient */}
          <path
            ref={pathRef}
            d="M500,100 C700,400 300,700 500,1000 C700,1300 300,1600 500,1900 C700,2200 300,2500 500,2800 C700,3100 300,3400 500,3700 C700,4000 300,4300 500,4600 C700,4900 300,5200 500,5500 C700,5800 300,6100 500,6400 C700,6700 300,7000 500,7300 C700,7600 300,7900 500,8200 C700,8500 300,8800 500,9100"
            className={styles.journeyPath}
            stroke="url(#pathGradient)"
          />
        </svg>
      </div>
      
      {/* Hero section with title - moved to the top */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>My Journey at Ta-da</h1>
          <p className={styles.heroSubtitle}>From Intern to Tech Lead</p>
        </div>
      </div>
      
      {/* Milestone Markers - redesigned with larger images */}
      <div className={styles.milestonesContainer}>
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            id={`milestone-${milestone.id}`}
            className={`${styles.milestoneMarker} ${milestone.position === 'right' ? styles.rightMarker : styles.leftMarker}`}
            style={{ top: `${milestonePositions[index]}vh` }}
          >
            <div className={styles.milestoneImageWrapper}>
              <Image 
                src={milestone.imageUrl}
                alt={`Image for ${milestone.title}`}
                width={500}
                height={300}
                className={styles.milestoneMainImage}
              />
              <div className={styles.milestoneOverlay} onClick={() => openModal(milestone.id)}>
                <div className={styles.milestoneInfo}>
                  <div className={styles.milestoneDate}>{milestone.date}</div>
                  <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                  <div className={styles.learnMoreIndicator}>
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal Dialog */}
      {activeModal && activeMilestoneData && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{activeMilestoneData.detailedContent.title}</h2>
              <div className={styles.modalDate}>{activeMilestoneData.date}</div>
            </div>
            
            <div className={styles.modalBody}>
              <p className={styles.modalDescription}>
                {activeMilestoneData.detailedContent.description}
              </p>
              
              {activeMilestoneData.detailedContent.challenges && (
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Challenges</h3>
                  <ul className={styles.modalList}>
                    {activeMilestoneData.detailedContent.challenges.map((challenge, idx) => (
                      <li key={idx} className={styles.modalListItem}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeMilestoneData.detailedContent.achievements && (
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Achievements</h3>
                  <ul className={styles.modalList}>
                    {activeMilestoneData.detailedContent.achievements.map((achievement, idx) => (
                      <li key={idx} className={styles.modalListItem}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeMilestoneData.detailedContent.techStack && (
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Technologies Used</h3>
                  <div className={styles.techStack}>
                    {activeMilestoneData.detailedContent.techStack.map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>{tech}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {activeMilestoneData.detailedContent.images && activeMilestoneData.detailedContent.images.length > 0 && (
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Screenshots</h3>
                  <div className={styles.imageGrid}>
                    {activeMilestoneData.detailedContent.images.map((image, idx) => (
                      <div key={idx} className={styles.imageContainer}>
                        <Image 
                          src={image.url}
                          alt={image.alt}
                          width={600}
                          height={400}
                          className={styles.modalImage}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Back to Home Link */}
      <div className={styles.backLink}>
        <Link href="/">
          <span className="sr-only">Back to home</span>
      </Link>
      </div>
    </div>
  );
} 