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
        <div className='flex flex-col h-lvh'>
            <div className='wrapeer'>
                <Navbar />
                <div className="container container-fluid-custom mx-auto text-black main-container talk-container">
                    <div className="film-Details-title container font-bold text-center mt-3 py-9" data-aos="fade-down">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative main-text-tital"><Link href={talk.link}>{talk.title}</Link></h2>
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
                                data-aos="fade-up"
                            ></iframe>
                        </div>
                        <div className="details py-0 detail-section" data-aos="fade-right">
                            <h5 className="text-left p-2 text-white py-0">{talk.subtitle}</h5>
                            <p className="p-2 text-white whitespace-pre-wrap">{talk.text}</p>
                        </div>
                    </div>
                </div>

                <div className="bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto footer_icon">
                    <Footer />
                </div>
            </div>
        </div>

    );
};

export default TalkDetails;
