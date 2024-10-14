"use client";

import Carousel from "@/app/components/Carousal";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apps } from "@/data/apps";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Modal } from "@/app/components/Modal";
import Slider from "react-slick";

const AppsDetails: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const { appId } = useParams();

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

    const app = apps.find((f) => f.id === appId);

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

    if (!app) {
        return <div>App not found</div>;
    }

    return (
        <div className="flex flex-col h-lvh  space-y-5">
            <div className="wrapeer">
                <Navbar />

                <div className="container container-fluid-custom mx-auto text-black main-container">
                    <div className="film-Details-title container font-bold text-center mt-3 py-9" data-aos="fade-down">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative main-text-tital">{app.title}</h2>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 p-2 app-details-contant">
                        <div className="w-full xl:w-1/3" data-aos="fade-up">
                            {
                                app.screenshots?.length > 0 ?
                                    <Carousel slides={app.screenshots} setShowModal={setShowModal} /> :
                                    <Image src={app.source} alt={app.title} className="mx-auto" />
                            }
                        </div>
                        <div className="details py-0 xl:w-2/3 detail-section" data-aos="fade-right">
                            <div className="mb-1 pb-2 flex justify-end  items-center pl-2">
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

            {/* Modal on click of slider image */}
            {showModal &&
                <Modal show={showModal}>
                    <>
                        <button type="button" className="z-30 absolute top-0 right-0 px-4 py-2 bg-red-500 text-white" onClick={() => setShowModal(false)}>
                            <i className="fa fa-close"></i>
                        </button>
                        <div className="relative h-full overflow-hidden rounded-lg modal-slider-main">
                            <Slider {...settings}>
                                {app.screenshots.map((slide, index) => (
                                    <div key={index}>
                                        <Image src={slide.src} className="block w-full h-full object-cover image-section cursor-pointer" alt={slide.alt} />
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
