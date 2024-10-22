"use client";

import Vimeo from "@/components/Vimeo";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../lib/utils/firestoreUtils";

interface Film {
    id: string;
    is_deleted: boolean;
    film_title: string;
    film_description: string;
    video_link: string;
}

const Film: NextPage = () => {
    const [films, setFilms] = useState<Film[]>([]);

    useEffect(() => {
        fetchFilms();
    }, []);

    const fetchFilms = async () => {
        const filmsList = await fetchDocuments('films');

        const mappedFilms = filmsList.map(film => ({
            id: film.id,
            is_deleted: film.is_deleted || false,
            film_title: film.film_title,
            film_description: film.film_description,
            video_link: film.video_link,
        }));

        setFilms(mappedFilms as Film[]);
    };

    return (
        <div className="mb-5 mt-5 pb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto flims-section">
            {films?.filter((f) => !f.is_deleted)?.map((film) => (
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
