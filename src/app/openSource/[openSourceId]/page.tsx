"use client";

import { getDocumentById } from "@/app/lib/utils/firestoreUtils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OpenSource {
    id: string;
    is_deleted: boolean;
    open_source_title: string;
    icon_link: string;
    open_source_description: string;
    web_link: string;
    github_link: string;
}

const OpenSourceDetails: React.FC = () => {
    const { openSourceId } = useParams();
    const [openSourceData, setOpenSourceData] = useState<OpenSource>();

    useEffect(() => {
        const fetchOpenSourceData = async () => {
            if (openSourceId && openSourceId !== "add") {
                if (typeof openSourceId !== 'string') {
                    throw new Error("Invalid open source ID");
                }

                const fetchedOpenSource = await getDocumentById('open_sources', openSourceId);
                if (fetchedOpenSource) {
                    setOpenSourceData({
                        id: fetchedOpenSource.id as string || "",
                        is_deleted: fetchedOpenSource.is_deleted as boolean || false,
                        open_source_title: fetchedOpenSource.open_source_title as string || "",
                        icon_link: fetchedOpenSource.icon_link as string || "",
                        open_source_description: fetchedOpenSource.open_source_description as string || "",
                        web_link: fetchedOpenSource.web_link as string || "",
                        github_link: fetchedOpenSource.github_link as string || "",
                    });
                }
            }
        };

        fetchOpenSourceData();
    }, [openSourceId]);

    return (
        <div className="flex flex-col h-lvh  space-y-5">
            <div className="wrapeer">
                <Navbar />

                <div className="container container-fluid-custom mx-auto text-black main-container">
                    <div className="film-Details-title container  font-bold text-center mt-3 py-9" data-aos="fade-down">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative main-text-tital">{openSourceData?.open_source_title}</h2>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-2 open-sources-contant">
                        <div className="w-full flex flex-col items-center justify-center" data-aos="fade-up">
                            {
                                <Image src={openSourceData?.icon_link || ""} alt={openSourceData?.open_source_title || ""} width={512} height={512} className="mx-auto" />
                            }
                        </div>
                        <div className="details py-0 detail-section" data-aos="fade-right">
                            <div className="mb-1 pb-2 flex justify-end  items-center pl-2">
                                <div className="mr-2 flex gap-3 items-center">
                                    <div className="footer-icon_second flex space-x-2">
                                        {
                                            openSourceData?.web_link !== "" &&
                                            <Link href={openSourceData?.web_link || ""} target="_blank">
                                                <i className="fa-solid text-white fa-globe"></i>
                                            </Link>
                                        }
                                        {
                                            openSourceData?.github_link !== "" &&
                                            <Link href={openSourceData?.github_link || ""} target="_blank">
                                                <i className="fa-brands text-white fa-github"></i>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 text-white" dangerouslySetInnerHTML={{ __html: openSourceData?.open_source_description || "" }} />
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

export default OpenSourceDetails;
