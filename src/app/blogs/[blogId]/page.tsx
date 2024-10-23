"use client";

import { getDocumentById } from "@/firebase/firestoreUtils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BlogObj } from "@/app/types/models";

const BlogDetails: React.FC = () => {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState<BlogObj>();

    useEffect(() => {
        const fetchBlogData = async () => {
            if (blogId && blogId !== "add") {
                if (typeof blogId !== 'string') {
                    throw new Error("Invalid blog ID");
                }

                const fetchedBlog = await getDocumentById('blogs', blogId);
                if (fetchedBlog) {
                    setBlogData({
                        id: fetchedBlog.id as string || "",
                        is_deleted: fetchedBlog.is_deleted as boolean || false,
                        blog_title: fetchedBlog.blog_title as string || "",
                        blog_images: fetchedBlog.blog_images as string[] || [],
                        blog_description: fetchedBlog.blog_description as string || "",
                    });
                }
            }
        };

        fetchBlogData();
    }, [blogId]);

    return (
        <div className="flex flex-col h-lvh  space-y-5">
            <div className="wrapeer">
                <Navbar />

                <div className="container container-fluid-custom mx-auto text-black main-container">
                    <div className="film-Details-title container  font-bold text-center mt-3 py-9" data-aos="fade-down">
                        <h2 className="text-4xl font-bold border-title capitalize text-white relative main-text-tital">{blogData?.blog_title}</h2>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-2 open-sources-contant">
                        <div className="w-full flex flex-col items-center justify-center" data-aos="fade-up">
                            {blogData?.blog_images && blogData?.blog_images.length > 0 &&
                                <Image src={blogData?.blog_images[0]} alt={blogData.blog_title} width={100} height={100} />}
                        </div>
                        <div className="details py-0 detail-section" data-aos="fade-right">
                            <div className="p-2 text-white" dangerouslySetInnerHTML={{ __html: blogData?.blog_description || "" }} />
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

export default BlogDetails;
