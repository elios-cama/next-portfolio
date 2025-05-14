import { InspirationItem } from './types';
import { SUPABASE_URL } from '@/constants';

export const inspirations: InspirationItem[] = [
  {
    id: 1,
    title: "gawx",
    image: `${SUPABASE_URL}/images/inspirations/logo/gawx_logo.png`,
    contentImage: `${SUPABASE_URL}/images/inspirations/content/gawx_content_1.jpg`,
    description: "The Reflective Creator & Master of Intentionality",
    detailedContent: {
      overview: "Gawx, a YouTuber and artist, offers a profound look into the creative process, not just in visual art but in how one curates their life and work. His philosophy extends beyond simple aesthetics, touching on how our environments shape us, how inspiration is a process of transformation, and how ambitious projects come from pushing personal boundaries.",
      highlights: [
        {
          title: "Your Space, Your Self",
          description: "Gawx's journey of transforming his living space into a direct reflection of his identity and creative process is deeply inspiring. He emphasizes intentionality, stating, \"the play shall be designed with intention... every element... shall serve a purpose.\" He moved from merely existing in a room to consciously curating it to be a studio, a set, and a source of inspiration, demonstrating how an environment can become an extension of one's inner world."
        },
        {
          title: "The Art of Inspiration",
          description: "His exploration of \"stealing like an artist\" highlights that inspiration isn't about direct copying but about absorbing, transforming, and reinterpreting. His \"telephone game\" analogy for art, where an idea evolves as it passes through different creative minds, perfectly illustrates this. Gawx's own process involved looking at street signs in Tokyo – an \"unexpected\" source – to fuel his \"Anatomy of the Artist Brain\" piece."
        },
        {
          title: "Creating Beyond Comfort",
          description: "The \"Super Artwork\" video showcases a commitment to ambitious, multi-disciplinary creation, pushing beyond comfort zones to \"mix all of my passions together.\" It's a testament to the power of combining different skills (drawing, painting, animation, photography, filmmaking, music) and leveraging tools to realize a singular, impactful vision. This willingness to tackle complex, personal projects is a huge motivator."
        },
        {
          title: "Connecting to My Development Approach",
          description: "Gawx's philosophy of intentional creation directly influences my approach to development and design. I aim to build reflective digital experiences, \"steal like a developer\" by drawing inspiration from diverse sources, and embrace ambitious, multi-faceted projects that combine technical skill with design thinking and a strong sense of purpose."
        }
      ],
      attribution: {
        author: "Gawx Art on YouTube",
        link: "https://www.youtube.com/@GawxArt",
        linkText: "Watch Gawx's creative journey"
      }
    }
  },
  {
    id: 2,
    title: "rægular",
    image: `${SUPABASE_URL}/images/inspirations/logo/raegular_logo.png`,
    contentImage: `${SUPABASE_URL}/images/inspirations/logo/raegular_logo.png`,
    description: "Architect of Visual Worlds for French Rap",
    detailedContent: {
      overview: "Rægular (Samuel Lamidey) is a standout designer who has shaped a significant part of the visual identity for contemporary French rap, working with artists like Nekfeu, Lomepal, and Alpha Wann. His work is a masterclass in blending graphic design, photography, and typography to create cohesive and impactful visual narratives. What's truly inspiring is his meticulous approach, his deep collaboration with artists, and his ability to make the \"album cover\" more than just an image – it's an object, an idea, and an experience.",
      highlights: [
        {
          title: "Holistic Visual Identity & The Power of the \"Object\"",
          description: "Rægular doesn't just design covers; he crafts visual identities. He deeply considers the physical \"object\" of an album, as seen with Nekfeu's Cyborg (using actual stickers and then digitally reinterpreting them) or Les Étoiles Vagabondes (the ambitious vacuum-sealed packaging). This respect for materiality, even in a digital-first world, and how it translates to the digital representation is a powerful statement. As he says, \"On peut rester encore hyperconceptuel et créatif. C'est même le but aujourd'hui. On peut être créatif avec une image sur Spotify.\""
        },
        {
          title: "Deep Collaboration & Artist-Centric Vision",
          description: "He emphasizes that \"la première chose déterminante est la rencontre avec les artistes... les écouter est primordial.\" His process involves understanding the artist's core idea (like Lomepal wanting to be disguised for Flip, or Nekfeu wanting Cyborg to not show his face) and then meticulously bringing that vision to life, often exceeding initial concepts. The relationship is summed up in \"Il sait très bien ce qu'il lui faut, je lui propose plusieurs trucs, et il me dit ensuite vers où aller.\""
        },
        {
          title: "Subtlety and Intentionality in Design",
          description: "While capable of bold statements, Rægular's work often has a considered subtlety. For Alpha Wann's Une main lave l'autre, the minimalist cover was directly inspired by listening to the album. The \"skate sticker\" logo system for Lomepal's Flip added a nuanced layer to the album's identity over time. Every choice feels intentional, reflecting his philosophy: \"Arrêter de réfléchir une pochette comme une pochette... L'avenir de la pochette est sans fin, sans limite.\""
        },
        {
          title: "Bridging Analog Craft and Digital Presentation",
          description: "His journey from traditional art education (ENSAD) to using those foundational skills in a modern context is evident. He talks about scanning, retouching, and even \"glitch\" aesthetics, showing a fluency in moving between physical creation and digital execution to achieve a unique result. As he notes, \"Parfois tu fais des choses et elles finissent par te dépasser.\""
        },
        {
          title: "Connecting to My Development Approach",
          description: "Rægular's dedication to creating unique, artist-reflective \"objects\" inspires my approach to development. I aim to craft cohesive digital experiences where every element forms an intuitive whole, practice user-centricity as deep collaboration, apply intentionality in UI/UX design ensuring each element serves a clear purpose, and blend proven principles with innovative execution to make digital experiences feel considered and special."
        }
      ],
      albumCovers: Array.from({ length: 14 }, (_, i) => `${SUPABASE_URL}/images/inspirations/content/raegular_content_${i + 1}.png`),
      attribution: {
        author: "Rægular (Samuel Lamidey)",
        link: "https://www.instagram.com/raegular",
        linkText: "Follow Rægular's work"
      }
    }
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