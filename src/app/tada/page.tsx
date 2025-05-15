"use client";

import React, { useState, useEffect, useRef } from "react";
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

type Milestone = {
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
};

export default function TadaJourney() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample milestones data with actual image paths
  const milestones: Milestone[] = [
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
        description: "Started as an intern at Ta-da in France, working on Flutter cross-platform development.",
        challenges: ["Learning the existing codebase", "Adapting to team workflows"],
        achievements: ["First successful feature implementation", "Quick onboarding"],
        techStack: ["Flutter", "Dart", "Firebase"],
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
        title: "Relocation to Dubai",
        description: "Transitioned to a full-time role and relocated to Dubai office.",
        achievements: ["Successfully transitioned to full-time role", "Adapted to new working environment"],
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
        title: "App Refactorization",
        description: "Led a complete refactorization of the app with new UI/UX designs.",
        challenges: ["Maintaining backward compatibility", "Coordinating with design team"],
        achievements: ["Improved app performance by 40%", "Reduced codebase size by 30%"],
        techStack: ["Flutter", "Dart", "Firebase", "Figma"],
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
        title: "Blockchain Integration Lead",
        description: "Led the integration of MultiversX blockchain, collaborating with Rust developers.",
        challenges: ["Learning blockchain concepts", "Integrating with native platforms"],
        achievements: ["Successful wallet connections", "Transaction flow implementation"],
        techStack: ["Flutter", "Dart", "MultiversX", "Rust"],
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
        description: "Worked in a reduced team of two, focusing on implementing gamification elements.",
        challenges: ["Tight deadline", "Resource constraints"],
        achievements: ["Increased user engagement by 35%", "Implemented rewards system"],
        techStack: ["Flutter", "Dart", "Firebase", "MultiversX"],
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
        title: "Expansion to Multiple Platforms",
        description: "Extended the app to web platforms including Telegram Mini-App and TON, plus Solana mobile integration.",
        challenges: ["Cross-platform compatibility", "Learning new blockchain ecosystems"],
        achievements: ["Successful launch on 3 new platforms", "User base growth of 50%"],
        techStack: ["Flutter", "Dart", "Web", "Telegram API", "TON", "Solana"],
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
        title: "Rewards System V2 with NFT Integration",
        description: "Developed a new rewards system with NFT integration while leading the mobile team.",
        challenges: ["Complex NFT mechanics", "Team coordination"],
        achievements: ["Successful NFT deployment", "Enhanced user retention"],
        techStack: ["Flutter", "Dart", "NFT APIs", "MultiversX", "Solana"],
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
        title: "Media Features & Development Leadership",
        description: "Implemented new photo and video features while taking on leadership of the development team.",
        challenges: ["Media processing optimization", "Cross-platform media handling"],
        achievements: ["Streamlined development workflow", "Successful media feature launch"],
        techStack: ["Flutter", "Dart", "FFmpeg", "Cloud Storage"],
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
        title: "Platform Transition to Web",
        description: "Led the technical transition from mobile app to web application platform.",
        challenges: ["Maintaining feature parity", "User migration"],
        achievements: ["Successful platform transition", "Improved platform stability"],
        techStack: ["React", "Next.js", "TypeScript", "Web3"],
        images: [
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/ending.png", alt: "New web platform" },
          { url: "https://xhbcnrqoulxkmmjvbddh.supabase.co/storage/v1/object/public/content/images/tada/mock.png", alt: "User migration dashboard" }
        ]
      }
    },
  ];

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
      milestones.forEach((milestone, index) => {
        const markerElement = document.getElementById(`milestone-${milestone.id}`);
        if (markerElement) {
          gsap.fromTo(
            markerElement,
            { 
              opacity: 0,
              x: milestone.position === 'right' ? 100 : -100,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
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
    <div className={styles.journeyContainer} ref={containerRef}>
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