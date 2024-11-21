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
    title: "Abundance Summit 2024 Keynote",
    subtitle:
      "Empathic AI and the Future of Learning: A Live Showcase of Digital Thinkers",
    link: "https://vimeo.com/928121597/2bacd80c75",
    next: "#deepfest",
    text: `Steve Brown gave a keynote talk about empathic AI, where he showcased his BotMuseum, featuring over 100 avatars modeled on great thinkers throughout history, like Aristotle, and introduced new characters such as Haley, a humanoid robot who firmly believes she is conscious. Brown, who serves as Chief AI Officer, also highlighted the AI faculty that played a pivotal role in the Abundance360 (A360) Summit. These AI-driven faculty members actively contributed to the event's discussions and debates, reflecting the growing integration of AI in education and innovation, as championed by Peter Diamandis and the A360 community.`,
  },

  {
    id: "deepfest",
    source: "https://player.vimeo.com/video/1031749433?h=1919ac950c",
    title: "LEAP Deepfest 2024 Keynote",
    subtitle:
      "Empathic AI: Revolutionizing Learning and Unlocking Human Potential",
    link: "https://vimeo.com/1031749433/1919ac950c",
    next: "#google",
    text: `Steve Brown delivered a groundbreaking keynote at LEAP Deepfest 2024, exploring how empathic AI is revolutionizing learning and creativity. He demonstrated AI-powered avatars modeled on great thinkers, enabling students to engage directly with figures like Aristotle and Frida Kahlo. Brown highlighted how AI can radically boost productivity, sharing his own experience of being 100x more efficient with AI tools since the pandemic. He also showcased how these avatars are transforming education, teaching students to code digital art and music interactively. The talk offered a compelling vision of AI as a tool for personalized, immersive learning and unprecedented human empowerment.`,
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
  },
];
