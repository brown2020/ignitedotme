// Define the type structure for each talk
export interface Talk {
    id: string;
    source: string;
    title: string;
    subtitle: string;
    link: string;
    next: string;
    text: string;
}

// Create the array of talks with the specified type
export const talks: Talk[] = [
    {
        id: "abundancesummit",
        source: "https://player.vimeo.com/video/928121597?h=2bacd80c75",
        title: "Abundance Summit",
        subtitle: "Empathic AI and the Future of Learning: A Live Showcase of Digital Thinkers",
        link: "https://youtu.be/dfWRJF1K4ec",
        next: "#google",
        text: `Steve Brown gave a keynote talk about empathic AI, where he showcased his BotMuseum, featuring over 100 avatars modeled on great thinkers throughout history, like Aristotle, and introduced new characters such as Haley, a humanoid robot who firmly believes she is conscious. Brown, who serves as Chief AI Officer, also highlighted the AI faculty that played a pivotal role in the Abundance360 (A360) Summit. These AI-driven faculty members actively contributed to the event's discussions and debates, reflecting the growing integration of AI in education and innovation, as championed by Peter Diamandis and the A360 community.`,
    },
    {
        id: "google",
        source: "https://www.youtube.com/embed/wXQ3eNNZLAk",
        title: "Talks at Google",
        subtitle: "The Making of Spark: A Burning Man Story",
        link: "https://youtu.be/wXQ3eNNZLAk",
        next: "#hongkong",
        text: `Steve Brown, director and producer of Spark: A Burning Man Story, was invited to speak at Google to discuss the process of creating a film to tell the rich and complex story of Burning Man.`,
    },
    {
        id: "hongkong",
        source: "https://www.youtube.com/embed/gzXCzixOHcM",
        title: "TEDxHongKongED",
        subtitle: "Scale-Free Values -- Learning from Art and Nature",
        link: "https://youtu.be/gzXCzixOHcM",
        next: "#larryharvey",
        text: `At TEDxHongKongED, Steve Brown uses stories from the film Spark: A Burning Man Story to discuss the core values that enable artists rooted in self expression to come together as a collaborative community.`,
    },
    {
        id: "larryharvey",
        source: "https://www.youtube.com/embed/dfWRJF1K4ec",
        title: "TEDxBlackRockCity",
        subtitle: "Burning Man Founder Larry Harvey Interviewed by Steve Brown",
        link: "https://youtu.be/dfWRJF1K4ec",
        next: "#abundancesummit",
        text: `Director Steve Brown interviewed the late Larry Harvey, founder of Burning Man, at the inaugural TEDxBlackRockCity. Larry describes how Burning Man started and the values and ideas that shaped its journey.`,
    }
];
