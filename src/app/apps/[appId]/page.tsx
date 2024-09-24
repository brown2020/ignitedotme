"use client";

import Carousel from "@/app/components/Carousal";
import Footer from "@/components/Footer";
import React from "react";
import Link from "next/link";
import { apps } from "@/data/apps";
import { useParams } from "next/navigation";
import Image from "next/image";

const AppsDetails: React.FC = () => {
    const { appId } = useParams();

    const app = apps.find((f) => f.id === appId);


    return (
        <div className="flex flex-col  space-y-5">
            <div>
                <div className="container mx-auto text-black main-container">
                    {app ?
                        <>
                            <div className="film-Details-title flex justify-center font-bold text-center py-8">
                                <h2 className="text-4xl font-bold border-title ">App</h2>
                            </div>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 p-2 app-details-contant">
                                <div className="w-full">
                                    {
                                        app.screenshots?.length > 0 ?
                                            <Carousel slides={app.screenshots} /> :
                                            <Image src={app.source} alt={app.title} className="mx-auto" />
                                    }
                                </div>
                                <div className="details py-0">
                                    <div className="mb-3 pb-2 flex justify-between  items-center pl-2">
                                        <h1 className="text-start font-mono text-4xl text-title relative text-black text-sm ">{app.title}</h1>
                                        <div className="mr-2 flex gap-3 items-center">
                                            <div className="footer-icon_second flex space-x-2">
                                                {
                                                    app.webLink !== "" &&
                                                    <Link href={app.webLink} target="_blank">
                                                        <i className="fa-solid text-black fa-globe"></i>
                                                    </Link>
                                                }
                                                {
                                                    app.iosLink !== "" &&
                                                    <Link href={app.iosLink} target="_blank">
                                                        <i className="fa-brands text-black fa-apple"></i>
                                                    </Link>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="italic text-justify p-2 text-black">{app.subtitle}</h5>
                                    <p className="text-justify p-2 text-gray-500">{app.text}</p>
                                </div>
                            </div>
                        </>
                        : <h1 className="text-center pt-20">App not found</h1>
                    }
                </div>

                <div className="bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto footer_icon">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AppsDetails;
