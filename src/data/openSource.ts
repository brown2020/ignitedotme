import generateMe from "../app/assets/projectImages/generate.me.png";
import promptMe from "../app/assets/projectImages/promptme.ai.png";
// import purposeFinder from "../app/assets/projectImages/purpose finder.png";
import { StaticImageData } from "next/image";

// Define the type structure for each talk
export interface OpenSources {
    id: string;
    source: StaticImageData;
    title: string;
    subtitle: string;
    screenshots: [];
    androidLink: string;
    iosLink: string;
    webLink: string;
    next: string;
    text: string;
}

// Create the array of talks with the specified type
export const openSources: OpenSources[] = [
    {
        id: "generate-me",
        source: generateMe,
        title: "Welcome to Generate.me",
        subtitle: "Seamless Custom Image Creation with AI: Explore, Manage, and Innovate.",
        screenshots: [],
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
        title: "Prompt.me: Compare AI Models in Real-Time",
        subtitle: "",
        screenshots: [],
        androidLink: "",
        iosLink: "",
        webLink: "https://github.com/brown2020/promptmeai",
        next: "#generate-me",
        text: `Prompt.me is an innovative platform designed to let users interact with multiple AI models side-by-side. It provides a seamless experience for comparing outputs from various models, making it ideal for researchers, developers, and enthusiasts. The platform includes a credit-based payment system, allowing users to unlock premium features and manage their profiles securely.

Key features include multi-model interaction, secure user authentication via Clerk, integrated Stripe payments for purchasing credits, and a smooth user experience powered by Zustand for state management. Users can enjoy enhanced readability with Markdown-supported chat responses, while all data is safely stored using Firebase.

Built on Next.js 14, Prompt.me leverages the latest web technologies to offer a cutting-edge interface. It incorporates robust state management, authentication, and payment processing, ensuring users have a flexible, secure, and high-performance environment for comparing AI models.`,
    },
    // {
    //     id: "purpose-finder",
    //     source: purposeFinder,
    //     title: "Welcome to Purpose Finder",
    //     subtitle: "Welcome to Purpose Finder, where together, we’ll craft your MTP and put you on a path to your Moonshot.",
    //     screenshots: [],
    //     androidLink: "",
    //     iosLink: "https://apps.apple.com/us/app/purposefinderai/id6474653859",
    //     webLink: "https://purposefinder.ai/",
    //     next: "#generate-me",
    //     text: `Welcome to Purpose Finder, an app designed to guide you in identifying your core passions and motivations. Using advanced AI, we make the process of discovering your true purpose both insightful and effortless. Craft a personal Massive Transformative Purpose (MTP) statement and bring your vision to life with inspiring visuals. Whether you're seeking direction in your personal or professional life, Purpose Finder is here to illuminate your path.`,
    // }
];
