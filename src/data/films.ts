// Define the type structure for each film
export interface Film {
  id: string;
  source: string;
  title: string;
  subtitle: string;
  link: string;
  next: string;
  text: string; // Replace JSX with a string
}

// Create the array of films with the specified type
export const films: Film[] = [
  {
    id: "spark",
    source: "75672269",
    title: "SPARK: A BURNING MAN STORY",
    subtitle:
      "“I drew a line on the ground, and I said on the other side of this line everything will be different. And everything has been different.”",
    link: "https://sparkpictures.com/",
    next: "#einstein",
    text: `Each year, thousands of people from around the globe gather in a dusty windswept Nevada desert to build a temporary city, collaborating on large-scale art and partying for a week before burning a giant effigy in a ritual frenzy. Rooted in principles of self-expression, self-reliance and community effort, Burning Man has grown famous for stirring ordinary people to shed their nine-to-five existence and act on their dreams. SPARK takes us behind the curtain with Burning Man organizers and participants, revealing a year of unprecedented challenges and growth. When ideals of a new world based on freedom and inclusion collide with realities of the “default world,” we wonder which dreams can survive.`,
  },
  {
    id: "einstein",
    source: "334188827",
    title: "CHASING EINSTEIN",
    subtitle:
      "What if you spent your life searching for something that might not exist?",
    link: "https://chasingeinsteinmovie.com/",
    next: "#twinsters",
    text: `Nobody has managed to challenge Einstein's theory of gravity, even though its shocking conclusion is that the majority of the universe's gravity must be due to a mysterious form of invisible matter which nobody has ever observed. But now physics stands at a crossroads. Some of the field's sharpest brains have dedicated their lives to search for this 'dark matter' while others are working on a new theory of gravity. CHASING EINSTEIN follows leading scientists at the largest particle accelerator (CERN), the largest underground labs (XENON), the largest telescope arrays, and the LIGO gravitational wave detector to find out whether Einstein's theory of relativity—as it passes its 100th birthday—stands the test of time. You don't need a PhD in rocket science to let yourself be carried away by this fascinating film documenting the hunt to answer one of the greatest open questions about our Universe.`,
  },
  {
    id: "twinsters",
    source: "217443978",
    title: "TWINSTERS",
    subtitle:
      "Imagine stumbling upon someone on the Internet who looks EXACTLY like you!",
    link: "https://twinsters.me/",
    next: "#poached",
    text: `In February 2013, Anaïs Bordier, a French fashion student living in London, stumbled upon a YouTube video featuring Samantha Futerman, an actress in Los Angeles, and was struck by their uncanny resemblance. After discovering they were born on the same day in Busan, Korea and both put up for adoption, Anaïs reached out to Samantha via Facebook. TWINSTERS is the true story that follows Samantha and Anaïs' journey into sisterhood, witnessing everything from their first meeting, to their first trip back to Korea where their separation took place. Explore the meaning of family and connection through a story that would have been impossible just 10 years ago without social media.`,
  },
  {
    id: "poached",
    source: "182040651",
    title: "POACHED",
    subtitle:
      "What happens when a boyhood hobby grows into a destructive obsession?",
    link: "https://poachedmovie.com/",
    next: "#occupy",
    text: `Egg thieves rob the nests of rare birds while a United Kingdom national police initiative named “Operation Easter” tries to stop them. The thieves are motivated not by money but by desire for the beauty of the egg and the thrill of the chase. Thousands of eggs confiscated in police raids have been found strapped under beds, beneath floorboards, and in secret rooms. With unprecedented access to the most notorious and inconspicuous perpetrators, POACHED explores the line between passion for nature and the psychology of an obsession that can wipe out a species.`,
  },
  {
    id: "occupy",
    source: "183178036",
    title: "OCCUPY THE FARM",
    subtitle:
      "The story of one community’s fight to save public land for urban farming.",
    link: "https://occupythefarmfilm.com/",
    next: "#micky",
    text: `200 farmers occupy a last piece of farmland in California's urban East Bay, plant 15,000 seedlings to feed the community and disrupt plans to build a shopping mall. What happens next will change the fate of the land and reveal a new strategy for activism. From tilling soil to police raids, from lawsuits to overflowing harvests, OCCUPY THE FARM reveals a resourceful, creative, and determined community as it fights against the privatization of the land and responds with direct action to a serious social need: access to healthy food.`,
  },
  {
    id: "micky",
    source: "268274751",
    title: "SWEET MICKY FOR PRESIDENT",
    subtitle:
      "“One of the most unlikely stories ever captured on film.” – Billboard",
    link: "https://sweetmickymovie.com/",
    next: "#dreams",
    text: `Music and politics collide when international music star, Pras Michel of the Fugees, returns to his homeland of Haiti following the devastating earthquake of 2010 to mobilize a presidential campaign for Haiti's most controversial musician: Michel Martelly aka Sweet Micky. The politically inexperienced pair set out against a corrupted government, civil unrest, and a fixed election. When Pras's former bandmate, superstar Wyclef Jean, also enters the presidential race, their chances seem further doomed. But with the help of a few friends, including Ben Stiller and former president Bill Clinton, they never give up on their dream of changing the course of Haiti's future.`,
  },
  {
    id: "dreams",
    source: "692470703",
    title: "DREAMS AT SEA",
    subtitle: "Recently in festivals. Public release coming soon!",
    link: "https://dreamsatsea.com/",
    next: "#signup",
    text: `Dreams at Sea takes us inside the journey of a sister and brother from Syria who discover that crossing the sea in search of safety was only the start of their odyssey. Each decision on the run, at a frontier, and on the street poses an existential threat. At each step, they face a choice: Will they stay together and risk getting lost in the limbo of an overburdened refugee relocation system? Or will they risk getting separated as they navigate dangerous underground paths alone? Along the way, their journey triggers a crisis of values as some Europeans react from fear while others form an underground railroad to help the family pursue love and dreams for their future.`,
  },
];
