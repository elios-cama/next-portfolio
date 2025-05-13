import { InspirationItem } from './types';
import { SUPABASE_URL } from '@/constants';

export const inspirations: InspirationItem[] = [
  {
    id: 1,
    title: "gawx",
    image: `${SUPABASE_URL}/images/inspirations/logo/gawx_logo.png`,
    contentImage: `${SUPABASE_URL}/images/inspirations/content/gawx_content_1.webp`,
    description: "Creative digital content with a focus on clean visual aesthetics.",
    detailedContent: null
  },
  {
    id: 2,
    title: "severance",
    image: `${SUPABASE_URL}/images/inspirations/logo/severance_logo.png`,
    contentImage: `${SUPABASE_URL}/images/inspirations/content/severance_content_1.webp`, 
    description: "Minimalist design inspired by the show's stark visual contrasts and deliberate compositions.",
    detailedContent: null
  },
  {
    id: 3,
    title: "untitled.stream",
    image: `${SUPABASE_URL}/images/inspirations/logo/untitled_logo.png`,
    contentImage: `${SUPABASE_URL}/images/inspirations/content/untitled_content_3.png`,
    contentVideo: `${SUPABASE_URL}/videos/inspirations/untitled/untitled_content_1.mov`,
    description: "The Sacred Place for Work-in-Progress Music",
    detailedContent: {
      overview: "Untitled is an app fundamentally built for music creators, designed to be a fluid, intuitive space for their work-in-progress tracks. It stands out by valuing the creative process itself, offering a sanctuary for unreleased music that traditional tools or streaming platforms don't provide. It's a powerful example of building deep, vertical workflows into a simple, mobile-first experience.",
      highlights: [
        {
          title: "Design That Feels Like an OS for Creativity",
          description: "The app is designed to be powerful yet simple, like a mini operating system for music creation. It takes complex tasks (organizing, editing, collaborating) and presents them in a way that doesn't feel overwhelming, fluidly integrating different tools (\"Notes, Edit, Record\" sections)."
        },
        {
          title: "Valuing the \"Work-in-Progress\"",
          description: "Untitled's core principle is treating unreleased music (\"the other 9000 tracks\") as precious and valuable. It's a space where music doesn't have to be \"finished\" for a streaming platform but can simply exist and be listened to, shared with friends, or worked on without pressure."
        },
        {
          title: "Building for the Craft & the Crafter",
          description: "Born from musicians, the app deeply understands and optimizes for the artist's workflow and emotional connection to their music. It's built for the craft, aiming to be the \"Frank Ocean of software\" – high quality and respected by creators at all levels."
        },
        {
          title: "Seamless Workflow Integration",
          description: "It aims to be the starting point (\"the spark\") and staying point for music creation, slowly integrating tools like AI stem splitting and editing directly into the mobile app. This vertical integration challenges the fragmented traditional music software landscape."
        },
        {
          title: "Creating New \"Atomic Units\" of Music",
          description: "Beyond finished songs, Untitled enables sharing snippets, WIP tracks, and the process itself as forms of content and connection. This challenges how music is traditionally consumed and distributed, creating a new kind of \"currency\" or engagement around unfinished work."
        }
      ],
      additionalVideo: `${SUPABASE_URL}/videos/inspirations/untitled/untitled_content_2.mov`,
      embedCode: `<iframe style="border-radius: 24px" src="https://untitled.stream/embed/gw6cfpQsnNIX" width="100%" height="344" allowFullScreen="" allow="picture-in-picture" frameborder="0" loading="lazy"></iframe>`,
      attribution: {
        author: "@packyM on X",
        link: "https://60fps.design/apps/untitled",
        linkText: "See all the amazing animations on 60fps.design"
      }
    }
  },
  {
    id: 4,
    title: "retro app",
    image: `${SUPABASE_URL}/images/inspirations/logo/retro_logo.png`,
    contentVideo: `${SUPABASE_URL}/videos/inspirations/retro_1.mov`,
    contentImage: `${SUPABASE_URL}/images/inspirations/content/retro_content_1.png`,
    description: "A Social Network Prioritizing Privacy, Connection, and Delight",
    detailedContent: {
      overview: "Retro is a refreshing counterpoint to mainstream social media. Instead of chasing infinite scroll and algorithmic attention, it focuses on being a private, low-pressure weekly photo journal shared exclusively with close friends and family. It proves that social platforms can be built ethically and beautifully, prioritizing user well-being and genuine connection.",
      highlights: [
        {
          title: "Distinct & Thoughtful Design",
          description: "Retro's aesthetic is clean, modern, and visually rich, using subtle gradients and considered typography. It feels premium and personal, creating a comfortable space for sharing meaningful moments."
        },
        {
          title: "Branding with Personality & Delight",
          description: "The evolving, often metallic logo is a strong visual identity. The playful bouncing logo animation on the login screen (like a digital pet or a classic screen saver) is unexpected and adds a memorable touch of personality and delight right at the start."
        },
        {
          title: "Intuitive Onboarding with Haptics",
          description: "The initial setup is smooth and guided. Thoughtful use of haptic feedback enhances the tactile feel of the app, making interactions feel responsive and well-crafted from the very first tap."
        },
        {
          title: "The \"Anti-Social\" Social Principle",
          description: "By focusing on a private \"Friends Only\" model, making likes/friend lists private, and removing caption pressure, Retro deliberately removes the anxiety and comparison inherent in public social media. It encourages authentic sharing over performance."
        },
        {
          title: "Features Supporting Genuine Connection",
          description: "Tools like collaborative Group Albums, easy weekly/monthly Recaps, and even the unique physical Postcard sending feature are designed to foster real connection and help users appreciate their own lives and memories."
        }
      ]
    }
  }
]; 