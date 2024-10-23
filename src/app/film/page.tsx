"use client";

import Vimeo from "@/components/Vimeo";
import React from "react";
import { Context } from "../context/Context";

const Film: React.FC = () => {
    const { data } = Context();

    return (
        <div className="mb-5 mt-5 pb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto flims-section">
            {data.films?.filter((f) => !f.is_deleted)?.map((film) => (
                <Vimeo
                    key={film.id}
                    id={film.id}
                    source={film.video_link}
                    title={film.film_title}
                    text={film.film_description}
                    details="film"
                />
            ))}
        </div>
    );
};

export default Film;
