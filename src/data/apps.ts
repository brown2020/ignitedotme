import SneakertopiaMuseum from "../app/assets/projectImages/SneakertopiaMuseum.png";
import aidmeHearing from "../app/assets/projectImages/Aid.me Hearing.png";
import purposeFinder from "../app/assets/projectImages/purpose finder.png";
import aidmehearing1 from "../app/assets/AidmeHearing/ss-1.jpg";
import aidmehearing2 from "../app/assets/AidmeHearing/ss-2.jpg";
import purposefinder5 from "../app/assets/PurposeFinderAI/ss-5.jpg";
import purposefinder4 from "../app/assets/PurposeFinderAI/ss-4.jpg";
import purposefinder3 from "../app/assets/PurposeFinderAI/ss-3.jpg";
import purposefinder2 from "../app/assets/PurposeFinderAI/ss-2.jpg";
import purposefinder1 from "../app/assets/PurposeFinderAI/ss-1.jpg";
import SneakertopiaMuseum5 from "../app/assets/SneakertopiaMuseum/ss-5.jpg";
import SneakertopiaMuseum4 from "../app/assets/SneakertopiaMuseum/ss-4.jpg";
import SneakertopiaMuseum3 from "../app/assets/SneakertopiaMuseum/ss-3.jpg";
import SneakertopiaMuseum2 from "../app/assets/SneakertopiaMuseum/ss-2.jpg";
import SneakertopiaMuseum1 from "../app/assets/SneakertopiaMuseum/ss-1.jpg";
import { StaticImageData } from "next/image";

interface Screenshot {
    src: StaticImageData;
    alt: string;
}

// Define the type structure for each app
export interface Apps {
    id: string;
    source: StaticImageData;
    title: string;
    subtitle: string;
    screenshots: Screenshot[];
    androidLink: string;
    iosLink: string;
    webLink: string;
    next: string;
    text: string;
}

// Create the array of apps with the specified type
export const apps: Apps[] = [
    {
        id: "purpose-finder",
        source: purposeFinder,
        title: "Purpose Finder",
        subtitle: "Welcome to Purpose Finder, where together, we’ll craft your MTP and put you on a path to your Moonshot.",
        screenshots: [
            {
                src: purposefinder1,
                alt: "1"
            },
            {
                src: purposefinder2,
                alt: "2"
            },
            {
                src: purposefinder3,
                alt: "3"
            },
            {
                src: purposefinder4,
                alt: "4"
            },
            {
                src: purposefinder5,
                alt: "5"
            }
        ],
        androidLink: "",
        iosLink: "https://apps.apple.com/us/app/purposefinderai/id6474653859",
        webLink: "https://purposefinder.ai/",
        next: "#aidme-hearing",
        text: `Welcome to Purpose Finder, an app designed to guide you in identifying your core passions and motivations. Using advanced AI, we make the process of discovering your true purpose both insightful and effortless. Craft a personal Massive Transformative Purpose (MTP) statement and bring your vision to life with inspiring visuals. Whether you're seeking direction in your personal or professional life, Purpose Finder is here to illuminate your path.

Key Features:

AI-Guided Discovery: Engage with our AI-driven methodology to explore and articulate your passions, strengths, and values. Our intuitive system personalizes the experience, adapting to your unique responses.

Craft Your MTP Statement: Transform insights into action. Based on your discoveries, the app assists you in crafting a profound and personalized Massive Transformative Purpose statement, a compass for your life's ambitions.

Inspiring Vision Boards: Visualize your purpose! Pair your MTP statement with captivating images that reflect your aspirations. Our app enables you to craft stunning visuals with advanced AI, helping you create a powerful and shareable vision board.

Seamless Sharing: Ready to inspire others? Easily share your MTP statement and vision board across social media platforms or with friends and family. Spark motivation and encourage others in their journey to find purpose.

Continuous Learning: The app evolves with you. As your insights and aspirations grow, Purpose Finder remembers your work and allows you to adapt and change it over time.

Privacy and Security: Your journey is private until you choose to share it. We are committed to maintaining the highest standards of data privacy and security.

Purpose Finder is more than an app; it's a companion on your journey towards a fulfilling and purpose-driven life. It's time to explore your inner world, discover what truly motivates you, and share your unique vision with the world.

Download Purpose Finder now and start your journey towards a life filled with passion and purpose!`,
    },
    {
        id: "aidme-hearing",
        source: aidmeHearing,
        title: "Aid.me Hearing",
        subtitle: "Aid.me listens and transcribes for you. It's like closed captioning for your life.",
        screenshots: [
            {
                src: aidmehearing1,
                alt: "1"
            },
            {
                src: aidmehearing2,
                alt: "2"
            }
        ],
        androidLink: "",
        iosLink: "https://apps.apple.com/us/app/aid-me-hearing/id6473455500",
        webLink: "https://aid.me",
        next: "#sneakertopia-museum",
        text: `This app continuously transcribes the speech around you. It's like closed captioning for your life. If you have trouble hearing, just put your phone or iPad on the table and let Aid.me listen and transcribe for you.`,
    },
    {
        id: "sneakertopia-museum",
        source: SneakertopiaMuseum,
        title: "Sneakertopia Museum",
        subtitle: "Explore the Sneakertopia Museum and Celebrate Sneaker Culture",
        screenshots: [
            {
                src: SneakertopiaMuseum1,
                alt: "1"
            },
            {
                src: SneakertopiaMuseum2,
                alt: "2"
            },
            {
                src: SneakertopiaMuseum3,
                alt: "3"
            },
            {
                src: SneakertopiaMuseum4,
                alt: "4"
            },
            {
                src: SneakertopiaMuseum5,
                alt: "5"
            }
        ],
        androidLink: "",
        iosLink: "https://apps.apple.com/us/app/sneakertopia-museum/id1588216615",
        webLink: "",
        next: "#purpose-finder",
        text: `Explore the Sneakertopia Museum using Augmented Reality to enhance the story and discover more about the people who shaped the culture. The Sneakertopia Museum presents the story of sneaker culture from its origins in sports to its remarkable growth into a creative art form that has become part of music, film, television, fashion, and design.

Point your iPhone or iPad camera at murals to reveal more information and inspiration from the stories of sneaker culture creators. Even if you are not in the museum, you can click on the museum guide to learn more about each scene and view hints for finding stories. You also can curate your own scenes from the museum to create your own unique mixed-reality photo ops.

The Sneakertopia Museum app requires iOS 15 to ensure best performance in Augmented Reality.`,
    },
];
