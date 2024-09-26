"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";

interface slideArr {
    src: StaticImageData,
    alt: string
}

interface Props {
    slides: slideArr[]
}

const Carousel: React.FC<Props> = ({
    slides
}) => {
    const [showModal, setShowModal] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

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

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <>
            <div id="default-carousel" className="relative w-full border border-solid border-gray-300 border-1 p-4" data-carousel="slide">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {slides.map((slide, index) => (
                        <div key={index} className={`absolute w-full transition-opacity duration-700 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`} data-carousel-item>
                            <Image src={slide.src} className="block w-full h-full object-cover image-section cursor-pointer" alt={slide.alt} onClick={() => setShowModal(true)} />
                        </div>
                    ))}
                </div>
                {
                    slides?.length > 1 &&
                    <>
                        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white border border-solid border-gray-800 border-2" : "bg-gray-400"}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group arrow-left" onClick={prevSlide}>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-black/50 group-focus:outline-none">
                                <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group arrow-right" onClick={nextSlide}>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-black/50 group-focus:outline-none ">
                                <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </>
                }
            </div>

            {/* Modal on click of slider image */}
            {showModal &&
                <Modal show={showModal}>
                    <>
                        <button type="button" className="z-30 absolute top-0 right-0 px-4 py-2 bg-red-500 text-white" onClick={() => setShowModal(false)}>
                            <i className="fa fa-close"></i>
                        </button>
                        <div className="relative h-full overflow-hidden rounded-lg">
                            {slides.map((slide, index) => (
                                <div key={index} className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`} data-carousel-item>
                                    <Image src={slide.src} className="block w-full h-full object-cover image-section cursor-pointer" alt={slide.alt} />
                                </div>
                            ))}
                        </div>
                        {
                            slides?.length > 1 &&
                            <>
                                <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white border border-solid border-gray-800 border-2" : "bg-gray-400"}`}
                                            onClick={() => goToSlide(index)}
                                            aria-label={`Slide ${index + 1}`}
                                        ></button>
                                    ))}
                                </div>
                                <button type="button" className="absolute top-0 start-0 flex items-center justify-center h-full px-4 cursor-pointer group arrow-left" onClick={prevSlide}>
                                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full group-hover:bg-black/50 group-focus:outline-none">
                                        <svg className="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                        </svg>
                                        <span className="sr-only">Previous</span>
                                    </span>
                                </button>
                                <button type="button" className="absolute top-0 end-0 flex items-center justify-center h-full px-4 cursor-pointer group arrow-right" onClick={nextSlide}>
                                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full group-hover:bg-black/50 group-focus:outline-none ">
                                        <svg className="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="sr-only">Next</span>
                                    </span>
                                </button>
                            </>
                        }
                    </>
                </Modal>
            }
        </>
    );
};

export default Carousel;
