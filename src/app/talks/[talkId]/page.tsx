"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { talks } from "@/data/talks";
import { NextPage } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const TalkDetails: NextPage = () => {
    const { talkId } = useParams();

    const talk = talks.find((f) => f.id === talkId);

    if (!talk) {
        return <div>Talk not found</div>;
    }

    return (
        <div>
            <Navbar />

            <div className="container mx-auto text-black main-container">
                <div className="film-Details-title flex justify-center font-bold text-center py-8 wow animate__animated animate__fadeInDown">
                    <h2 className="text-4xl font-bold border-title capitalize text-white main-text-tital">Talk</h2>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 p-2 talk-details-contant">
                    <div className="w-full">
                        <iframe
                            width="100%"
                            height="500"
                            src={talk.source}
                            title={talk.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className=" wow animate__animated animate__fadeInUp"
                        ></iframe>
                    </div>
                    <div className="details py-0  wow animate__animated animate__fadeInRight">
                        <div className="mb-2 pb-2 flex justify-between  p-2">
                            <Link href={talk.link}>
                                <h2 className="text-start relative">{talk.title}</h2>
                            </Link>
                        </div>
                        <h5 className="text-left p-2 text-white">{talk.subtitle}</h5>
                        <p className="p-2 text-white whitespace-pre-wrap">{talk.text}</p>
                    </div>
                </div>
            </div>

            <div className="bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto footer_icon">
                <Footer />
            </div>
        </div>
    );
};

export default TalkDetails;
