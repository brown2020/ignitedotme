import Vimeo from "@/components/Vimeo";
import { films } from "@/data/films";
import { NextPage } from "next";
import React from "react";

const Film: NextPage = () => {
    return (
        <div className="flex flex-col mb-5 mt-5 pb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto flims-section">
            {films.map((film) => (
                <Vimeo
                    key={film.id}
                    id={film.id}
                    source={`https://player.vimeo.com/video/${film.source}?title=0&byline=0&portrait=0`}
                    title={film.title}
                    subtitle={film.subtitle}
                    link={film.link}
                    next={film.next}
                    text={film.text}
                    details="film"
                />
            ))}
        </div>
    );
};

export default Film;
