import { apps } from "@/data/apps";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Apps: React.FC = () => {
    return (
        <div className="flex flex-col mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto talks-section">
            {apps.map((app) => (
                <div className="flex flex-col space-y-3 first-of-type:mt-5 border border-slate-100 video-grid-section" id={app.id} key={app.id}>
                    <div className="apps-img mt-0">
                        <Image src={app.source} alt={app.title} />
                    </div>
                    <div className="flex flex-col max-w-2xl px-2 mx-auto my-4  text-center mx-sm-5 py-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-justify p-2 text-orange-400">{app.title}</h2>
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
                        <h5 className="italic text-justify p-2 text-black">{app.subtitle}</h5>
                        {/* Render text string */}
                        <p className="text-justify tracking-tight p-2 text-gray-500">{app.text}
                            <Link href={`apps/${app.id}`}><span className="ml-2 text-lg text-orange-400 underline cursor-pointer">View More</span></Link>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Apps;

