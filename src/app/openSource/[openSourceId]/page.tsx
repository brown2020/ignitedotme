"use client";

import Carousel from "@/app/components/Carousal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { openSources } from "@/data/openSource";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const OpenSourceDetails: React.FC = () => {
    const { openSourceId } = useParams();

    const openSource = openSources.find((f) => f.id === openSourceId);

    if (!openSource) {
        return <div>App not found</div>;
    }

    return (
        <div className="flex flex-col  space-y-5">
            <div>
                <Navbar />

                <div className="container mx-auto text-black main-container">
                    <div className="film-Details-title container  font-bold text-center py-8 wow animate__animated animate__fadeInDown">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative main-text-tital">{openSource.title}</h2>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-2 open-sources-contant">
                        <div className="w-full flex flex-col items-center justify-center wow animate__animated animate__fadeInUp">
                            {
                                openSource.screenshots?.length > 0 ?
                                    <Carousel slides={openSource.screenshots} /> :
                                    <Image src={openSource.source} alt={openSource.title} className="mx-auto" />
                            }
                        </div>
                        <div className="details py-0 wow  detail-section animate__animated animate__fadeInRight">
                            <div className="mb-1 pb-2 flex justify-end  items-center pl-2">
                                <div className="mr-2 flex gap-3 items-center">
                                    <div className="footer-icon_second flex space-x-2">
                                        {
                                            openSource.webLink !== "" &&
                                            <Link href={openSource.webLink} target="_blank">
                                                <i className="fa-solid text-white fa-globe"></i>
                                            </Link>
                                        }
                                        {
                                            openSource.iosLink !== "" &&
                                            <Link href={openSource.iosLink} target="_blank">
                                                <i className="fa-brands text-white fa-apple"></i>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                            {openSource.subtitle !== "" && <h5 className="text-left p-2 text-white">{openSource.subtitle}</h5>}
                            <p className="p-2 text-white whitespace-pre-wrap"> {openSource.text}</p>
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

export default OpenSourceDetails;
