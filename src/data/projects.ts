import abundanceHub from '../app/assets/projectImages/AbundanceHub.png';
import aidmeHearing from '../app/assets/projectImages/Aid.me Hearing.png';
import asteroidXR from '../app/assets/projectImages/AsteroidXR.png';
import charmXR from '../app/assets/projectImages/CharmXR.png';
import generateMe from '../app/assets/projectImages/generate.me.png';
import purposeFinder from '../app/assets/projectImages/purpose finder.png';
import sneakertopia from '../app/assets/projectImages/Sneakertopia Museum.png';

// Define the type structure for each talk
export interface Project {
    id: string;
    source: any;
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
export const projects: Project[] = [
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
        webLink: "https://generate.me/",
        next: "#aidme-hearing",
        text: `Welcome to Purpose Finder, an app designed to guide you in identifying your core passions and motivations. Using advanced AI, we make the process of discovering your true purpose both insightful and effortless. Craft a personal Massive Transformative Purpose (MTP) statement and bring your vision to life with inspiring visuals. Whether you're seeking direction in your personal or professional life, Purpose Finder is here to illuminate your path.`,
    },
    {
        id: "aidme-hearing",
        source: aidmeHearing,
        title: "Aid.me Hearing",
        subtitle: "Aid.me listens and transcribes for you. It's like closed captioning for your life.",
        screenshots: [],
        androidLink: "",
        iosLink: "https://apps.apple.com/us/app/aid-me-hearing/id6473455500",
        webLink: "",
        next: "#abundance-hub",
        text: `This app continuously transcribes the speech around you. It's like closed captioning for your life. If you have trouble hearing, just put your phone or iPad on the table and let Aid.me listen and transcribe for you.`,
    },
    {
        id: "abundance-hub",
        source: abundanceHub,
        title: "AbundanceHub",
        subtitle: "AbundanceHub is the app for Abundance360 Members, providing tools, resources, member connections, and information for the annual Summit.",
        screenshots: [],
        androidLink: "",
        iosLink: "https://apps.apple.com/us/app/abundancehub/id1667181761",
        webLink: "",
        next: "#asteroid-xr",
        text: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    },
    {
        id: "asteroid-xr",
        source: asteroidXR,
        title: "AsteroidXR",
        subtitle: "Create your own personal Asteroid Belt, viewable in Augmented Reality!",
        screenshots: [],
        androidLink: "",
        iosLink: "https://apps.apple.com/us/app/asteroidxr/id1623251777",
        webLink: "",
        next: "#charm-xr",
        text: `Use the AsteroidXR app to select, place and photograph 3D models from a library of astroids, planets and spacecraft.`,
    },
    {
        id: "charm-xr",
        source: charmXR,
        title: "CharmXR",
        subtitle: "Augmented Reality viewer for the CHARM XR augmented reality content management system.",
        screenshots: [],
        androidLink: "",
        iosLink: "https://apps.apple.com/us/app/charmxr/id1623084608",
        webLink: "",
        next: "#charm-xr",
        text: `Use the Charm XR App to view Augmented Reality content organized and managed in the Charm XR content management system.`,
    },
];
