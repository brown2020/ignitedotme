// import abundanceHub from "../app/assets/projectImages/AbundanceHub.png";
import SneakertopiaMuseum from "../app/assets/projectImages/SneakertopiaMuseum.png";
import aidmeHearing from "../app/assets/projectImages/Aid.me Hearing.png";
import purposeFinder from "../app/assets/projectImages/purpose finder.png";
// import asteroidXR from "../app/assets/projectImages/AsteroidXR.png";
// import charmXR from "../app/assets/projectImages/CharmXR.png";
import aidmehearing1 from "../app/assets/AidmeHearing/ss-1.jpg";
import aidmehearing2 from "../app/assets/AidmeHearing/ss-2.jpg";
// import abundancehub from "../app/assets/AbundanceHub.jpg";
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
// import asteroidxr3 from "../app/assets/AsteroidXR/ss-3.jpg";
// import asteroidxr2 from "../app/assets/AsteroidXR/ss-2.jpg";
// import asteroidxr1 from "../app/assets/AsteroidXR/ss-1.jpg";
// import charmxr3 from "../app/assets/CharmXR/ss-3.jpg";
// import charmxr2 from "../app/assets/CharmXR/ss-2.jpg";
// import charmxr1 from "../app/assets/CharmXR/ss-1.jpg";
import { StaticImageData } from "next/image";

interface Screenshot {
    src: StaticImageData;
    alt: string;
}

// Define the type structure for each talk
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

// Create the array of talks with the specified type
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
        text: `Welcome to Purpose Finder, an app designed to guide you in identifying your core passions and motivations. Using advanced AI, we make the process of discovering your true purpose both insightful and effortless. Craft a personal Massive Transformative Purpose (MTP) statement and bring your vision to life with inspiring visuals. Whether you're seeking direction in your personal or professional life, Purpose Finder is here to illuminate your path.`,
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
        webLink: "",
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
                src: SneakertopiaMuseum5,
                alt: "1"
            },
            {
                src: SneakertopiaMuseum4,
                alt: "2"
            },
            {
                src: SneakertopiaMuseum3,
                alt: "3"
            },
            {
                src: SneakertopiaMuseum2,
                alt: "4"
            },
            {
                src: SneakertopiaMuseum1,
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
    // {
    //     id: "abundance-hub",
    //     source: abundanceHub,
    //     title: "AbundanceHub",
    //     subtitle: "AbundanceHub is the app for Abundance360 Members, providing tools, resources, member connections, and information for the annual Summit.",
    //     screenshots: [
    //         {
    //             src: abundancehub,
    //             alt: "1"
    //         }
    //     ],
    //     androidLink: "",
    //     iosLink: "https://apps.apple.com/us/app/abundancehub/id1667181761",
    //     webLink: "",
    //     next: "#asteroid-xr",
    //     text: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    // },
    // {
    //     id: "asteroid-xr",
    //     source: asteroidXR,
    //     title: "AsteroidXR",
    //     subtitle: "Create your own personal Asteroid Belt, viewable in Augmented Reality!",
    //     screenshots: [
    //         {
    //             src: asteroidxr3,
    //             alt: "1"
    //         },
    //         {
    //             src: asteroidxr2,
    //             alt: "2"
    //         },
    //         {
    //             src: asteroidxr1,
    //             alt: "3"
    //         }
    //     ],
    //     androidLink: "",
    //     iosLink: "https://apps.apple.com/us/app/asteroidxr/id1623251777",
    //     webLink: "",
    //     next: "#charm-xr",
    //     text: `Use the AsteroidXR app to select, place and photograph 3D models from a library of astroids, planets and spacecraft.`,
    // },
    // {
    //     id: "charm-xr",
    //     source: charmXR,
    //     title: "CharmXR",
    //     subtitle: "Augmented Reality viewer for the CHARM XR augmented reality content management system.",
    //     screenshots: [
    //         {
    //             src: charmxr3,
    //             alt: "1"
    //         },
    //         {
    //             src: charmxr2,
    //             alt: "2"
    //         },
    //         {
    //             src: charmxr1,
    //             alt: "3"
    //         }
    //     ],
    //     androidLink: "",
    //     iosLink: "https://apps.apple.com/us/app/charmxr/id1623084608",
    //     webLink: "",
    //     next: "#aidme-hearing",
    //     text: `Use the Charm XR App to view Augmented Reality content organized and managed in the Charm XR content management system.`,
    // },
];
