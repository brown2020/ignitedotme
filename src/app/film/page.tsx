import Vimeo from "@/components/Vimeo";
import { films } from "@/data/films";
import { NextPage } from "next";
import React from "react";

const Film: NextPage = () => {
  return (
    <div className="flex flex-col mb-5 space-y-5">
      {films.map((film) => (
        <Vimeo
          key={film.id}
          id={film.id}
          source={
            "https://player.vimeo.com/video/" +
            film.source +
            "?title=0&byline=0&portrait=0"
          }
          title={film.title}
          subtitle={film.subtitle}
          link={film.link}
          next={film.next}
          text={film.text}
        />
      ))}
    </div>
  );
};

export default Film;
