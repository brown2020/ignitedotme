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
    link,
    // next,
    text,
    details
}) => {
    return (
        <div className="flex flex-col space-y-3 first-of-type:mt-5 border border-slate-100 video-grid-section" id={id}>
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
            <div className="flex flex-col max-w-2xl px-2 mx-auto my-4  text-center mx-sm-5 py-2">
                <a href={link}>
                    <h2 className="text-justify p-2 text-orange-400">{title}</h2>
                    <h5 className="italic text-justify p-2 text-black">{subtitle}</h5>
                </a>
                {/* Render text string */}
                <p className="text-justify tracking-tight p-2 text-gray-500">{text}
                    <Link href={`${details}/${id}`}><span className="ml-2 text-lg text-orange-400 underline cursor-pointer">View More</span></Link>
                    {/* {text.length > 150 && showContent ? text : text.slice(0, 150)}
                    <Link href={`${details}/${id}`}><span className="ml-2 text-lg text-orange-400 underline cursor-pointer">{text.length > 150 && showContent ? 'View less' : 'View More'} </span></Link> */}
                </p>
            </div>
        </div>
    );
};

export default Vimeo;
