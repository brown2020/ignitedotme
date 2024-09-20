"use client";

import Link from "next/link";
import Image from "next/image";
import headerImage from "@/app/assets/ignite-header.jpeg";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import Footer from "@/components/Footer";
import Project from "./projects/page";
import Talks from "./talks/page";
import Film from "./film/page";
import { useEffect, useState } from "react";

export default function Home() {
    const [formData, setFormData] = useState({
        email: "",
        fname: "",
        lname: "",
        company: "",
        about: "",
    });

    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
    }, [])

    function scrollFunction() {
        const returnToTop = document.getElementById('return-to-top');
        if (!returnToTop) return;

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            returnToTop.style.display = 'block';
        } else {
            returnToTop.style.display = 'none';
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const mailtoLink = `mailto:info@ignitechannel.com?subject=Sign Up&body=
    First Name: ${formData.fname}%0D%0A
    Last Name: ${formData.lname}%0D%0A
    Email: ${formData.email}%0D%0A
    Company: ${formData.company}%0D%0A
    About: ${formData.about}`;

        window.location.href = mailtoLink;
    };

    return (
        <div className="flex flex-col flex-1 w-full" id="home">
            {/* Header image */}
            <div className="relative h-screen -mt-16 w-full">
                <Image
                    src={headerImage}
                    alt="skydiver"
                    fill
                    className="object-cover h-full w-full"
                />
                {/* Container that holds the centered content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full">
                    <div className="flex flex-col max-w-2xl pt-12 mt-auto space-y-2">
                        <h1 className="text-center">Ignite</h1>
                        <p className="mx-5 text-center">
                            Ignite Channel produces and distributes innovative documentary
                            films and media technology.{" "}
                            <Link href="/#spark">
                                <span className="underline cursor-pointer">Check out</span>
                            </Link>{" "}
                            our recent work.{" "}
                            <Link href="/#signup">
                                <span className="underline cursor-pointer">Sign up</span>
                            </Link>{" "}
                            to get notified about upcoming film productions and events.
                        </p>
                    </div>

                    {/* Chevron Down icon centered */}
                    <Link href="/#spark">
                        <div className="flex items-center justify-center w-full mt-auto mb-3 cursor-pointer">
                            <ChevronDown size={32} />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Film section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="film">
                <div className="container mx-auto">
                    <h1 className="text-center font-mono text-4xl text-title relative text-black">Film</h1>
                    <p className="text-center mt-5 pt-5 w-full max-w-md m-auto text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores omnis provident quam reiciendis voluptatum.</p>
                </div>
            </div>
            <Film />

            {/* Talks section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="talks">
                <h1 className="text-center font-mono text-title relative text-black">Talks</h1>
                <p className="text-center mt-5 pt-5 w-full max-w-md m-auto text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.A dolores omnis provident quam reiciendis voluptatum.</p>
            </div>
            <Talks />

            {/* Projects section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="projects">
                <h1 className="text-center font-mono text-title relative text-black">Projects</h1>
                <p className="text-center mt-5 pt-5 w-full max-w-md m-auto text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.A dolores omnis provident quam reiciendis voluptatum.</p>
            </div>
            <Project />

            {/* Signup section */}
            <div
                className="mt-10 relative flex flex-col items-center w-full"
                id="sign-up"
            >
                <div className="container px-6 text-center">
                    <h3 className="text-3xl font-bold text-gray-800">
                        Passionate about innovative media? Stay in touch!
                    </h3>
                    <p className="text-lg text-gray-600">
                        Ignite Channel is an independent film and mediatech producer devoted to
                        creators who seek to make the world a better place. We value passionate
                        curiosity, fearless creativity, and a collaborative spirit. Sign up to
                        learn more.
                    </p>
                </div>
                <div className="sigup-form relative top-10 flex flex-col items-center justify-center w-full h-full max-w-5xl px-6 py-10 text-center z-10 mx-auto bg-white shadow-2xl">
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            value={formData.email}
                            placeholder="Email address"
                            type="email"
                            name="EMAIL"
                            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-full"
                        />

                        <div className="flex space-x-4">
                            <input
                                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-full"
                                onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                value={formData.fname}
                                placeholder="First name"
                                type="text"
                                name="FNAME"
                            />
                            <input
                                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-full"
                                onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                value={formData.lname}
                                placeholder="Last name"
                                type="text"
                                name="LNAME"
                            />
                        </div>

                        <input
                            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-full"
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            value={formData.company}
                            placeholder="Organization"
                            type="text"
                            name="MERGE3"
                        />

                        <input
                            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-full"
                            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                            value={formData.about}
                            placeholder="About yourself"
                            type="text"
                            name="MERGE5"
                        />

                        <button
                            className="py-4 px-8 form-btn text-white rounded-full font-semibold shadow-lg hover:shadow-none"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                <div className="w-full footer_icon pb-4 pt-16">
                    <Footer />
                </div>
            </div>
            <button onClick={topFunction} id="return-to-top" title="Go to top">
                <ChevronUp size={32} />
            </button>
        </div>
    );
}
