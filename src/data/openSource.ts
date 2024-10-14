import generateMe from "../app/assets/projectImages/generate.me.png";
import promptMe from "../app/assets/projectImages/promptme.ai.png";
import { StaticImageData } from "next/image";

interface Screenshot {
  src: StaticImageData;
  alt: string;
}

// Define the type structure for each open source
export interface OpenSources {
  id: string;
  source: StaticImageData;
  title: string;
  subtitle: string;
  screenshots: Screenshot[];
  gitLink: string;
  androidLink: string;
  iosLink: string;
  webLink: string;
  next: string;
  text: string;
}

// Create the array of open sources with the specified type
export const openSources: OpenSources[] = [
  {
    id: "generate-me",
    source: generateMe,
    title: "Generate.me",
    subtitle: "Custom Image Creation with AI: Explore, Manage, and Innovate.",
    screenshots: [],
    gitLink: "https://github.com/brown2020/generatemeai",
    androidLink: "",
    iosLink: "",
    webLink: "https://generate.me/",
    next: "#prompt-me",
    text: `Generate.me is an open-source AI-powered application that allows users to create custom images based on text prompts and explore different artistic styles. It integrates with several services, including OpenAI and Fireworks API, and uses Firebase for backend management. The application offers options for users to either provide their own API keys or purchase credits to generate images.

Key features include image generation, profile management, and real-time updates using Firestore. Users can manage their profile details, track API usage, and buy credits for extended functionality. The app also includes Firebase authentication for secure access and supports dynamic screen adjustments for responsive design.

Built with Next.js 14, React, TypeScript, and Zustand for state management, Generate.me provides a seamless experience for image generation with features like error handling, notifications, and synchronization of local and remote states.

This project is actively being developed, and contributions are welcome through GitHub.`,
  },
  {
    id: "prompt-me",
    source: promptMe,
    title: "Prompt.me",
    subtitle: "Compare AI Models in Real-Time",
    screenshots: [],
    gitLink: "https://github.com/brown2020/promptmeai",
    androidLink: "",
    iosLink: "",
    webLink: "https://prompt.me/",
    next: "#generate-me",
    text: `Prompt.me is an innovative platform designed to let users interact with multiple AI models side-by-side. It provides a seamless experience for comparing outputs from various models, making it ideal for researchers, developers, and enthusiasts. The platform includes a credit-based payment system, allowing users to unlock premium features and manage their profiles securely.

Key features include multi-model interaction, secure user authentication via Clerk, integrated Stripe payments for purchasing credits, and a smooth user experience powered by Zustand for state management. Users can enjoy enhanced readability with Markdown-supported chat responses, while all data is safely stored using Firebase.

Built on Next.js 14, Prompt.me leverages the latest web technologies to offer a cutting-edge interface. It incorporates robust state management, authentication, and payment processing, ensuring users have a flexible, secure, and high-performance environment for comparing AI models.`,
  },
];
