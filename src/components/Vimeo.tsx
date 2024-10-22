"use client";
import Link from "next/link";
import React from "react";

interface IVimeoProps {
    id: string;
    source: string;
    title: string;
    text: string;
    details: string;
}

const Vimeo: React.FC<IVimeoProps> = ({
    id,
    source,
    title,
    text,
    details
}) => {
    return (
        <div className="flex flex-col space-y-3 first-of-type:mt-5 video-grid-section bg-[#14151B] rounded-md overflow-hidden" data-aos="fade-up" id={id}>
            <div className="videoWrapper mt-0">
                <iframe
                    width="560"
                    height="315"
                    src={source}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="flex flex-col max-w-2xl px-2 mx-auto my-4  text-center mx-sm-5 py-2 video-detail-section">
                <Link href={`${details}/${id}`}>
                    <h2 className="text-left p-2 text-orange-400">{title}</h2>
                    <div>
                        <div className="text-left p-2 text-white" dangerouslySetInnerHTML={{ __html: `${text?.slice(0, 140)}...` }} />
                        <span className="ml-2 text-lg text-orange-400 underline cursor-pointer view-more-section"><strong className="box-overlay">View More</strong></span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Vimeo;
