"use client";

import Footer from "@/components/Footer";
import { NextPage } from "next";
import React from "react";
import { useParams } from "next/navigation";
import { films } from "@/data/films";
import Link from "next/link";

const FilmDetails: NextPage = () => {
    const { filmId } = useParams();

    const film = films.find((f) => f.id === filmId);

    if (!film) {
        return <div>Film not found</div>;
    }

    return (
        <div>
            <div className="container mx-auto text-black main-container" style={{ minHeight: "768px" }}>
                <div className="film-Details-title flex justify-center font-bold text-center py-8 mb-2">
                    <h2 className="text-4xl font-bold border-title ">Film</h2>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-2 film-details-contant">
                    <div className="w-full">
                        <iframe
                            width="100%"
                            height="500"
                            src={`https://player.vimeo.com/video/${film.source}?title=0&byline=0&portrait=0`}
                            title={film.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="details py-0">
                        <div className="mb-3 pb-2 flex justify-between p-2">
                            <Link href={film.link}>
                                <h1 className="text-start font-mono text-2xl relative text-black title-text">{film.title}</h1>
                            </Link>
                        </div>
                        <h5 className="italic text-justify p-2 text-black">{film.subtitle}</h5>
                        <p className="p-2 text-gray-500 whitespace-pre-wrap">{film.text}</p>
                    </div>
                </div>
            </div>

            <div className=" bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto footer_icon">
                <Footer />
            </div>
        </div>
    );
};

export default FilmDetails;
