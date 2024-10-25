"use client";

import { getDocumentById } from "@/firebase/firestoreUtils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TalkObj } from "@/app/types/models";

const TalkDetails: NextPage = () => {
    const { talkId } = useParams();

    const [talksData, setTalksData] = useState<TalkObj>();

    useEffect(() => {
        const fetchTalkData = async () => {
            if (talkId && talkId !== "add") {
                if (typeof talkId !== 'string') {
                    throw new Error("Invalid talk ID");
                }

                const fetchedtalk = await getDocumentById('talks', talkId);
                if (fetchedtalk) {
                    setTalksData({
                        id: fetchedtalk.id as string || "",
                        is_deleted: fetchedtalk.is_deleted as boolean || false,
                        talk_title: fetchedtalk.talk_title as string || "",
                        video_link: fetchedtalk.video_link as string || "",
                        talk_description: fetchedtalk.talk_description as string || ""
                    });
                }
            }
        };

        fetchTalkData();
    }, [talkId]);

    return (
        <div className='flex flex-col h-lvh'>
            <div className='wrapeer'>
                <Navbar />
                <div className="container container-fluid-custom mx-auto text-black main-container talk-container">
                    <div className="film-Details-title container font-bold text-center mt-3 py-9" data-aos="fade-down">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative main-text-tital">
                            {talksData?.talk_title}
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 p-2 talk-details-contant">
                        <div className="w-full">
                            <iframe
                                width="100%"
                                height="500"
                                src={talksData?.video_link}
                                title={talksData?.talk_title}
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                data-aos="fade-up"
                            ></iframe>
                        </div>
                        <div className="details py-0 detail-section" data-aos="fade-right">
                            <div className="p-2 text-white" dangerouslySetInnerHTML={{ __html: talksData?.talk_description || "" }} />
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
