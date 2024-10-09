import headerImage from "@/app/assets/ignite-header.jpeg";
import { StaticImageData } from "next/image";

// Define the type structure for each talk
export interface MainBanner {
    id: string;
    source: string | StaticImageData;
    type: "video" | "image";
}

// Create the array of talks with the specified type
export const mainBanner: MainBanner[] = [
    {
        id: "1",
        source: "/assets/headerVideo.mp4",
        type: "video",
    },
    {
        id: "2",
        source: headerImage,
        type: "image",
    },
];
