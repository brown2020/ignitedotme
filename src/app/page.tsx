"use client";

import Image from "next/image";
import headerImage from "@/app/assets/ignite-header.jpeg";
import { ChevronDown, ChevronUp } from "lucide-react";
import Footer from "@/components/Footer";
import Apps from "./apps/page";
import Talks from "./talks/page";
import Film from "./film/page";
import { useEffect, useState } from "react";
import OpenSources from "./openSource/page";

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
        const returnToTop = document.getElementById("return-to-top");
        if (!returnToTop) return;

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            returnToTop.style.display = "block";
        } else {
            returnToTop.style.display = "none";
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

    const scrollToSection = (id: string) => {
        const header = document.getElementById("header");
        const element = document.getElementById(id);
        const headerOffset = 64; // Height of your sticky header
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;

            let offsetTop = 0;
            if (header) offsetTop = header.offsetTop;

            const offsetPosition = window.scrollY > offsetTop ? elementPosition + window.scrollY - headerOffset : elementPosition - headerOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
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
                            <span className="underline cursor-pointer" onClick={() => scrollToSection("film")}>Check out</span>
                            {" "}
                            our recent work.{" "}
                            <span className="underline cursor-pointer" onClick={() => scrollToSection("sign-up")}>Sign up</span>
                            {" "}
                            to get notified about upcoming film productions and events.
                        </p>
                    </div>

                    {/* Chevron Down icon centered */}
                    <div>
                        <div className="flex items-center justify-center w-full mt-auto mb-3 cursor-pointer" onClick={() => scrollToSection("film")}>
                            <ChevronDown size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Film section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="film">
                <div className="container mx-auto">
                    <h1 className="text-center font-mono text-4xl text-title relative text-black capitalize">Film</h1>
                    <p className="text-center mt-5 pt-5 w-full max-w-lg m-auto text-gray-500  p-2">Exploring the human experience through documentary features on art,
                        culture, science, and society.</p>
                </div>
            </div>
            <Film />

            {/* Talks section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="talks">
                <h1 className="text-center font-mono text-title relative text-black capitalize">Talks</h1>
                <p className="text-center mt-5 pt-5 w-full max-w-lg m-auto text-gray-500 p-2">Inspiring ideas on technology, AI, and film: Keynotes and TEDx talks
                    that spark innovation.</p>
            </div>
            <Talks />

            {/* Apps section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="apps">
                <h1 className="text-center font-mono text-title relative text-black capitalize">Apps</h1>
                <p className="text-center mt-5 pt-5 w-full max-w-lg m-auto text-gray-500 p-2">Discover apps from self-development to augmented reality, designed to
                    enhance your experience.</p>
            </div>
            <Apps />

            {/* Open source section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="openSource">
                <h1 className="text-center font-mono text-title relative text-black capitalize">Open Source</h1>
                <p className="text-center mt-5 pt-5 w-full max-w-lg m-auto text-gray-500 p-2">Empowering creativity through collaboration: Explore, contribute, and
                    innovate with our open-source projects.</p>
            </div>
            <OpenSources />

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
