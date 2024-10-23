"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Context } from "../context/Context";

const OpenSources: React.FC = () => {
    const { data } = Context();

    return (
        <div className="mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto talks-section" data-aos="fade-right">
            {data.openSources?.filter((f) => !f.is_deleted)?.map((openSource) => (
                <div className="flex flex-col space-y-3 first-of-type:mt-5 video-grid-section bg-[#14151B] rounded-md overflow-hidden" id={openSource.id} key={openSource.id}>
                    <div className="apps-img mt-0">
                        <Image src={openSource.icon_link} alt={openSource.open_source_title} width={512} height={512} />
                    </div>
                    <div className="flex flex-col max-w-2xl px-2 my-4 text-center mx-sm-5 py-2 detail-section">
                        <div className="flex justify-between items-center">
                            <Link href={`openSource/${openSource.id}`}>
                                <h2 className="text-left p-2 text-orange-400">{openSource.open_source_title}</h2>
                            </Link>
                            <div className="footer-icon_second flex space-x-2 p-2">
                                {
                                    openSource.web_link !== "" &&
                                    <Link href={openSource.web_link || ""} target="_blank">
                                        <i className="fa-solid text-white fa-globe"></i>
                                    </Link>
                                }
                                {
                                    openSource.github_link !== "" &&
                                    <Link href={openSource.github_link || ""} target="_blank">
                                        <i className="fa-brands text-white fa-github"></i>
                                    </Link>
                                }
                            </div>
                        </div>
                        <Link href={`openSource/${openSource.id}`}>
                            <div className="text-left p-2 text-white" dangerouslySetInnerHTML={{ __html: `${openSource.open_source_description?.slice(0, 160)}...` }} />
                            <span className="ml-2 text-lg text-orange-400 underline cursor-pointer view-more-section"><strong className="box-overlay">View More</strong></span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OpenSources;

