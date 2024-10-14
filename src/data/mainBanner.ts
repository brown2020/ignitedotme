import headerImage from "@/app/assets/ignite-header.jpeg";
import { StaticImageData } from "next/image";

// Define the type structure for each slider image
export interface MainBanner {
  id: string;
  source: string | StaticImageData;
  type: "video" | "image";
}

// Create the array of slider images with the specified type
export const mainBanner: MainBanner[] = [
  {
    id: "1",
    source: headerImage,
    type: "image",
  },
  {
    id: "2",
    source: "68789661",
    type: "video",
  }
];
