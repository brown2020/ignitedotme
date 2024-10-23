"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Context } from "../context/Context";

const Blogs: React.FC = () => {
    const { data } = Context();

    return (
        <div className="mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto talks-section" data-aos="fade-right">
            {data.blogs?.filter((f) => !f.is_deleted)?.map((blog) => (
                <div className="flex flex-col space-y-3 first-of-type:mt-5 video-grid-section bg-[#14151B] rounded-md overflow-hidden" id={blog.id} key={blog.id}>
                    <div className="apps-img mt-0">
                        {blog?.blog_images && blog?.blog_images.length > 0 &&
                            <Image src={blog?.blog_images[0]} alt={blog.blog_title} width={100} height={100} />}
                    </div>
                    <div className="flex flex-col max-w-2xl px-2 my-4 text-center mx-sm-5 py-2 detail-section">
                        <div className="flex justify-between items-center">
                            <Link href={`blogs/${blog.id}`}>
                                <h2 className="text-left p-2 text-orange-400">{blog.blog_title}</h2>
                            </Link>
                        </div>
                        <Link href={`blogs/${blog.id}`}>
                            <div className="text-left p-2 text-white" dangerouslySetInnerHTML={{ __html: `${blog.blog_description?.slice(0, 160)}...` }} />
                            <span className="ml-2 text-lg text-orange-400 underline cursor-pointer view-more-section"><strong className="box-overlay">View More</strong></span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blogs;

