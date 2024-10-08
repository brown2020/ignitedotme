"use client";
import Link from "next/link";
import React from "react";

interface IVimeoProps {
    id: string;
    source: string;
    title: string;
    subtitle: string;
    link: string;
    next: string;
    text: string; // Updated text to string
    details: string;
}

const Vimeo: React.FC<IVimeoProps> = ({
    id,
    source,
    title,
    subtitle,
    text,
    details
}) => {
    return (
        <div className="flex flex-col space-y-3 first-of-type:mt-5 video-grid-section bg-[#14151B] rounded-md overflow-hidden wow animate__animated animate__fadeInUp" id={id}>
            <div className="videoWrapper mt-0">
                <iframe
                    width="560"
                    height="315"
                    src={source}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="flex flex-col max-w-2xl px-2 mx-auto my-4  text-center mx-sm-5 py-2 ">
                <Link href={`${details}/${id}`}>
                    <h2 className="text-left p-2 text-orange-400">{title}</h2>
                    <h5 className="text-left p-2 text-white">{subtitle}</h5>
                    {/* Render text string */}
                    <div>
                        <p className="text-left  p-2 text-white whitespace-pre-wrap ">{text?.slice(0, 150)}...
                            <span className="ml-2 text-lg text-orange-400 underline cursor-pointer view-more-section"><strong className="box-overlay">View More</strong></span>
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Vimeo;
