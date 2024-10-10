import { openSources } from "@/data/openSource";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OpenSources: React.FC = () => {
    return (
        <div className="mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto talks-section wow animate__animated animate__fadeInRight ">
            {openSources.map((openSource) => (
                <div className="flex flex-col space-y-3 first-of-type:mt-5 video-grid-section bg-[#14151B] rounded-md overflow-hidden" id={openSource.id} key={openSource.id}>
                    <div className="apps-img mt-0">
                        <Image src={openSource.source} alt={openSource.title} />
                    </div>
                    <div className="flex flex-col max-w-2xl px-2 mx-auto my-4  text-center mx-sm-5 py-2 detail-section">
                        <div className="flex justify-between items-center">
                            <Link href={`openSource/${openSource.id}`}>
                                <h2 className="text-left p-2 text-orange-400">{openSource.title}</h2>
                            </Link>
                            <div className="footer-icon_second flex space-x-2 p-2">
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
                        <Link href={`openSource/${openSource.id}`}>
                            <h5 className="text-left p-2 text-white">{openSource.subtitle}</h5>
                            {/* Render text string */}
                            <p className="text-left  p-2 text-white whitespace-pre-wrap">
                                {openSource.text?.slice(0, 150)}...
                                <span className="ml-2 text-lg text-orange-400 underline cursor-pointer view-more-section"><strong className="box-overlay">View More</strong></span>
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OpenSources;

