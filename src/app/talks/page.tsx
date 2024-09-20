import Vimeo from "@/components/Vimeo";
import { talks } from "@/data/talks";
import React from "react";

const Talks: React.FC = () => {
    return (
        <div className="flex flex-col mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 container mx-auto talks-section">
            {talks.map((talk) => (
                <Vimeo
                    key={talk.id}
                    id={talk.id}
                    source={talk.source}
                    title={talk.title}
                    subtitle={talk.subtitle}
                    link={talk.link}
                    next={talk.next}
                    text={talk.text}
                    details="talks"
                />
            ))}
        </div>
    );
};

export default Talks;
