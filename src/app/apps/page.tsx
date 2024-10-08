import { apps } from "@/data/apps";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Apps: React.FC = () => {
    return (
        <div className="mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto talks-section  wow animate__animated animate__fadeInLeft">
            {apps.map((app) => (
                <div className="flex flex-col space-y-3 first-of-type:mt-5 rounded-md video-grid-section bg-[#14151B]" id={app.id} key={app.id}>
                    <div className="apps-img mt-0">
                        <Image src={app.source} alt={app.title} />
                    </div>
                    <div className="flex flex-col max-w-2xl px-2 mx-auto my-4  text-center mx-sm-5 py-2">
                        <div className="flex justify-between items-center">
                            <Link href={`apps/${app.id}`}>
                                <h2 className="text-left p-2 text-orange-400">{app.title}</h2>
                            </Link>
                            <div className="footer-icon_second flex space-x-2 p-2">
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
                        <Link href={`apps/${app.id}`}>
                            <h5 className=" text-left p-2 text-white">{app.subtitle}</h5>
                            {/* Render text string */}
                            <p className="text-left p-2 text-white whitespace-pre-wrap">{app.text?.slice(0, 150)}...
                                <span className="ml-2 text-lg text-orange-400 underline cursor-pointer view-more-section"><strong className="box-overlay">View More</strong></span>
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Apps;

