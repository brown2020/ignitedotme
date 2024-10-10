"use client";

import Carousel from "@/app/components/Carousal";
import Footer from "@/components/Footer";
import React from "react";
import Link from "next/link";
import { apps } from "@/data/apps";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const AppsDetails: React.FC = () => {
    const { appId } = useParams();

    const app = apps.find((f) => f.id === appId);

    if (!app) {
        return <div>App not found</div>;
    }

    return (
        <div className="flex flex-col  space-y-5">
            <div>
                <Navbar />

                <div className="container mx-auto text-black main-container">
                    <div className="film-Details-title container font-bold text-center py-8 wow animate__animated animate__fadeInDown">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative main-text-tital">{app.title}</h2>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 p-2 app-details-contant">
                        <div className="w-full xl:w-1/3 wow animate__animated animate__fadeInUp">
                            {
                                app.screenshots?.length > 0 ?
                                    <Carousel slides={app.screenshots} /> :
                                    <Image src={app.source} alt={app.title} className="mx-auto" />
                            }
                        </div>
                        <div className="details py-0 xl:w-2/3 wow animate__animated animate__fadeInRight detail-section">
                            <div className="mb-1 pb-2 flex justify-end  items-center pl-2">
                                {/* <h2 className="text-start relative">{app.title}</h2> */}
                                <div className="mr-2 flex gap-3 items-center">
                                    <div className="footer-icon_second flex space-x-2">
                                        {
                                            app.webLink !== "" &&
                                            <Link href={app.webLink} target="_blank">
                                                <i className="fa-solid text-white fa-globe"></i>
                                            </Link>
                                        }
                                        {
                                            app.iosLink !== "" &&
                                            <Link href={app.iosLink} target="_blank">
                                                <i className="fa-brands text-white fa-apple"></i>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                            <h5 className="text-left p-2 text-white">{app.subtitle}</h5>
                            <p className="p-2 text-white whitespace-pre-wrap">{app.text}</p>
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

export default AppsDetails;
