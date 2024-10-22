"use client";

import Carousel from "@/app/components/Carousal";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Modal } from "@/app/components/Modal";
import Slider from "react-slick";
import { getDocumentById } from "@/app/lib/utils/firestoreUtils";

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

const AppsDetails: React.FC = () => {
    const { appId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [appData, setAppData] = useState<App>();

    useEffect(() => {
        const fetchAppData = async () => {
            if (appId && appId !== "add") {
                if (typeof appId !== 'string') {
                    throw new Error("Invalid app ID");
                }

                const fetchedApp = await getDocumentById('apps', appId);
                if (fetchedApp) {
                    setAppData({
                        id: fetchedApp.id as string || "",
                        is_deleted: fetchedApp.is_deleted as boolean || false,
                        app_title: fetchedApp.app_title as string || "",
                        screenshots: fetchedApp.screenshots as string[] || [],
                        app_description: fetchedApp.app_description as string || "",
                        web_link: fetchedApp.web_link as string || "",
                        ios_app_link: fetchedApp.ios_app_link as string || "",
                        android_app_link: fetchedApp.android_app_link as string || ""
                    });
                }
            }
        };

        fetchAppData();
    }, [appId]);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 20000,
        arrows: true,
    };

    return (
        <div className="flex flex-col h-lvh  space-y-5">
            <div className="wrapeer">
                <Navbar />

                <div className="container container-fluid-custom mx-auto text-black main-container">
                    <div className="film-Details-title container font-bold text-center mt-3 py-9" data-aos="fade-down">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative main-text-tital">{appData?.app_title}</h2>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 p-2 app-details-contant">
                        <div className="w-full xl:w-1/3" data-aos="fade-up">
                            {
                                appData?.screenshots && appData?.screenshots?.length > 0 &&
                                <Carousel slides={appData?.screenshots || []} setShowModal={setShowModal} />
                            }
                        </div>
                        <div className="details py-0 xl:w-2/3 detail-section" data-aos="fade-right">
                            <div className="mb-1 pb-2 flex justify-end  items-center pl-2">
                                <div className="mr-2 flex gap-3 items-center">
                                    <div className="footer-icon_second flex space-x-2">
                                        {
                                            appData?.web_link !== "" &&
                                            <Link href={appData?.web_link || ""} target="_blank">
                                                <i className="fa-solid text-white fa-globe"></i>
                                            </Link>
                                        }
                                        {
                                            appData?.ios_app_link !== "" &&
                                            <Link href={appData?.ios_app_link || ""} target="_blank">
                                                <i className="fa-brands text-white fa-apple"></i>
                                            </Link>
                                        }
                                        {
                                            appData?.android_app_link !== "" &&
                                            <Link href={appData?.android_app_link || ""} target="_blank">
                                                <i className="fa-brands text-white fa-apple"></i>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 text-white" dangerouslySetInnerHTML={{ __html: appData?.app_description || "" }} />
                        </div>
                    </div>
                </div>

                <div className="bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto footer_icon">
                    <Footer />
                </div>
            </div>

            {/* Modal on click of slider image */}
            {showModal &&
                <Modal show={showModal}>
                    <>
                        <button type="button" className="z-30 absolute top-0 right-0 px-4 py-2 bg-red-500 text-white" onClick={() => setShowModal(false)}>
                            <i className="fa fa-close"></i>
                        </button>
                        <div className="relative h-full overflow-hidden rounded-lg modal-slider-main">
                            <Slider {...settings}>
                                {appData?.screenshots.map((slide, index) => (
                                    <div key={index}>
                                        <Image src={slide} width={100} height={100} className="block w-full h-full object-cover image-section cursor-pointer" alt='image' />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </>
                </Modal>
            }
        </div>
    );
};

export default AppsDetails;
