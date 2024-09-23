"use client";

import Carousel from "@/app/components/Carousal";
import Footer from "@/components/Footer";
import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useParams } from "next/navigation";
import Image from "next/image";

const ProjectDetails: React.FC = () => {
    const { projectId } = useParams();

    const project = projects.find((f) => f.id === projectId);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="flex flex-col  space-y-5">
            <div>
                <div className="container mx-auto text-black main-container">
                    <div className="film-Details-title flex justify-center font-bold text-center py-8">
                        <h2 className="text-4xl font-bold border-title ">Project</h2>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 project-details-contant">
                        <div className="w-full">
                            {
                                project.screenshots?.length > 0 ?
                                    <Carousel slides={project.screenshots} /> :
                                    <Image src={project.source} alt={project.title} className="mx-auto" />
                            }
                        </div>
                        <div className="details py-0">
                            <div className="mb-3 pb-2 flex justify-between  items-center pl-2">
                                <h1 className="text-start font-mono text-4xl text-title relative text-black text-sm ">{project.title}</h1>
                                <div className="mr-5 flex gap-3 items-center">
                                    <div className="footer-icon_second flex space-x-2">
                                        {
                                            project.webLink !== "" &&
                                            <Link href={project.webLink} target="_blank">
                                                <i className="fa-solid text-black fa-globe"></i>
                                            </Link>
                                        }
                                        {
                                            project.iosLink !== "" &&
                                            <Link href={project.iosLink} target="_blank">
                                                <i className="fa-brands text-black fa-apple"></i>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                            <h5 className="italic text-justify p-2 text-black">{project.subtitle}</h5>
                            <p className="text-justify p-2 text-gray-500">{project.text}</p>
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

export default ProjectDetails;
