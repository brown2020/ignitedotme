"use client";

import Footer from "@/components/Footer";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getDocumentById } from "@/firebase/firestoreUtils";
import { FilmObj } from "@/app/types/models";

const FilmDetails: NextPage = () => {
    const { filmId } = useParams();
    const [filmsData, setFilmsData] = useState<FilmObj>();

    useEffect(() => {
        const fetchFilmData = async () => {
            if (filmId && filmId !== "add") {
                if (typeof filmId !== 'string') {
                    throw new Error("Invalid film ID");
                }

                const fetchedFilm = await getDocumentById('films', filmId);
                if (fetchedFilm) {
                    setFilmsData({
                        id: fetchedFilm.id as string || "",
                        is_deleted: fetchedFilm.is_deleted as boolean || false,
                        film_title: fetchedFilm.film_title as string || "",
                        video_link: fetchedFilm.video_link as string || "",
                        film_description: fetchedFilm.film_description as string || ""
                    });
                }
            }
        };

        fetchFilmData();
    }, [filmId]);

    return (
        <div className="flex flex-col h-lvh">
            <div className='wrapeer'>
                <Navbar />

                <div className="container  container-fluid-custom mx-auto text-black main-container film-main-container">
                    <div className="film-Details-title container font-bold text-center mt-3 py-9 mb-2" data-aos="fade-down">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative  main-text-tital">
                            {filmsData?.film_title}
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-2 film-details-contant">
                        <div className="w-full ">
                            <iframe
                                width="100%"
                                height="500"
                                src={filmsData?.video_link}
                                title={filmsData?.film_title}
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                data-aos="fade-left"
                            ></iframe>
                        </div>
                        <div className="details py-0  detail-section" data-aos="fade-right">
                            <div className="p-2 text-white" dangerouslySetInnerHTML={{ __html: filmsData?.film_description || "" }} />
                        </div>
                    </div>
                </div>

                <div className=" bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto footer_icon">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default FilmDetails;
