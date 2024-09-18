import Vimeo from "@/components/Vimeo";
import { talks } from "@/data/talks";
import { NextPage } from "next";
import React from "react";

const Talks: NextPage = () => {
  return (
    <div className="flex flex-col mb-5 space-y-5">
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
        />
      ))}
    </div>
  );
};

export default Talks;
