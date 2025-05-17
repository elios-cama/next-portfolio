export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
}

export const projects: Project[] = [
  {
    id: "vinted-uae",
    title: "YABI",
    description: "A marketplace application for buying and selling secondhand clothing in the UAE, similar to Vinted.\n\nThe app includes features like user authentication, item listings with images, search functionality, messaging between users, and secure payment processing. Designed with a clean, user-friendly interface optimized for mobile devices.",
    techStack: ["Flutter", "Firebase", "Cloud Functions", "Stripe API"],
    images: ["/images/projects/vinted-uae-preview.png"]
  },
  {
    id: "tournament-bot",
    title: "Tournament Bot",
    description: "A Telegram bot designed to manage offline gaming tournaments. This bot facilitates tournament organization by handling player registrations, bracket generation, match scheduling, and result tracking.\n\nThe bot sends notifications to participants about upcoming matches and tournament progress, making it easier for organizers to run events smoothly without manual tracking.",
    techStack: ["Python", "Telegram Bot API", "PostgreSQL", "Docker"],
    images: ["/images/projects/tournament-bot-preview.png"]
  }
]; 