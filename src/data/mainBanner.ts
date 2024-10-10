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
    source: headerImage,
    type: "image",
  },
  {
    id: "2",
    source: "/assets/headerVideo1.mp4",
    type: "video",
  },

  {
    id: "3",
    source: "/assets/headerVideo2.mp4",
    type: "video",
  },
];
