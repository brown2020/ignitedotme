import generateMe from '../app/assets/projectImages/generate.me.png';
import purposeFinder from '../app/assets/projectImages/purpose finder.png';
import { StaticImageData } from 'next/image';

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
        subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        screenshots: [],
        androidLink: "",
        iosLink: "",
        webLink: "https://generate.me/",
        next: "#purpose-finder",
        text: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    },
    {
        id: "purpose-finder",
        source: purposeFinder,
        title: "Welcome to Purpose Finder",
        subtitle: "Welcome to Purpose Finder, where together, we’ll craft your MTP and put you on a path to your Moonshot.",
        screenshots: [],
        androidLink: "",
        iosLink: "https://apps.apple.com/us/app/purposefinderai/id6474653859",
        webLink: "https://purposefinder.ai/",
        next: "#generate-me",
        text: `Welcome to Purpose Finder, an app designed to guide you in identifying your core passions and motivations. Using advanced AI, we make the process of discovering your true purpose both insightful and effortless. Craft a personal Massive Transformative Purpose (MTP) statement and bring your vision to life with inspiring visuals. Whether you're seeking direction in your personal or professional life, Purpose Finder is here to illuminate your path.`,
    }
];
