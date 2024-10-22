"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../lib/utils/firestoreUtils";

interface App {
    id: string;
    is_deleted: boolean;
    app_title: string;
    screenshots: string[];
    app_description: string;
    web_link: string;
    ios_app_link: string;
    android_app_link: string;
}

const Apps: React.FC = () => {
    const [apps, setApps] = useState<App[]>([]);

    useEffect(() => {
        fetchApps();
    }, []);

    const fetchApps = async () => {
        const appsList = await fetchDocuments('apps');

        const mappedApps = appsList.map(app => ({
            id: app.id,
            is_deleted: app.is_deleted || false,
            app_title: app.app_title,
            screenshots: app.screenshots || [],
            app_description: app.app_description,
            web_link: app.web_link,
            ios_app_link: app.ios_app_link,
            android_app_link: app.android_app_link,
        }));

        setApps(mappedApps as App[]);
    };

    return (
        <div className="mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto talks-section" data-aos="fade-left">
            {apps?.filter((f) => !f.is_deleted)?.map((app) => (
                <div className="flex flex-col space-y-3 first-of-type:mt-5 rounded-md video-grid-section bg-[#14151B]" id={app.id} key={app.id}>
                    <div className="apps-img mt-0">
                        {app.screenshots && app.screenshots.length > 0 &&
                            <Image src={app.screenshots[0]} alt={app.app_title} width={100} height={100} />}
                    </div>
                    <div className="flex flex-col max-w-2xl px-2 my-4 text-center mx-sm-5 py-2 detail-section">
                        <div className="flex justify-between items-center">
                            <Link href={`apps/${app.id}`}>
                                <h2 className="text-left p-2 text-orange-400">{app.app_title}</h2>
                            </Link>
                            <div className="footer-icon_second flex space-x-2 p-2">
                                {
                                    app.web_link !== "" &&
                                    <Link href={app.web_link} target="_blank">
                                        <i className="fa-solid text-white fa-globe"></i>
                                    </Link>
                                }
                                {
                                    app.ios_app_link !== "" &&
                                    <Link href={app.ios_app_link} target="_blank">
                                        <i className="fa-brands text-white fa-apple"></i>
                                    </Link>
                                }
                            </div>
                        </div>
                        <Link href={`apps/${app.id}`}>
                            <div className="text-left p-2 text-white" dangerouslySetInnerHTML={{ __html: `${app.app_description?.slice(0, 140)}...` }} />
                            <span className="ml-2 text-lg text-orange-400 underline cursor-pointer view-more-section"><strong className="box-overlay">View More</strong></span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Apps;

