"use client";

import Link from "next/link";
import { useState } from "react";
import Vimeo from "../components/Vimeo";
import { films } from "../data/films";
import Image from "next/image";
import headerImage from "@/app/assets/ignite-header.jpeg";
import signupImage from "@/app/assets/ignite-poached.jpeg";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    lname: "",
    company: "",
    about: "",
  });

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
    <div className="flex flex-col flex-1 w-full">
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
          <div className="flex flex-col max-w-2xl pt-16 mt-auto space-y-2">
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
      <div className="flex flex-col mb-5 space-y-5">
        {films.map((film) => (
          <Vimeo
            key={film.id}
            id={film.id}
            source={`https://player.vimeo.com/video/${film.source}?title=0&byline=0&portrait=0`}
            title={film.title}
            subtitle={film.subtitle}
            link={film.link}
            next={film.next}
            text={film.text}
          />
        ))}
      </div>

      {/* Signup section */}
      <div
        className="relative flex flex-col items-center w-full h-screen"
        id="signup"
      >
        <Image
          src={signupImage}
          alt="signup"
          fill
          className="object-cover h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full max-w-2xl px-2 py-5 text-center z-10 mx-auto">
          <h3 className="my-5 text-white">
            Passionate about innovative media? Stay in touch!
          </h3>
          <p className="mx-5 mb-5 text-white">
            Ignite Channel is an independent film and mediatech producer devoted
            to creators who seek to make the world a better place. We value
            passionate curiosity, fearless creativity, and a collaborative
            spirit. Sign up to learn more.
          </p>
          <form className="w-full space-y-2" onSubmit={handleSubmit}>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              placeholder="Email address"
              type="email"
              name="EMAIL"
              className="w-full p-2 bg-transparent border rounded-md text-white"
            />

            <div className="flex space-x-2">
              <input
                className="w-full p-2 bg-transparent border rounded-md text-white"
                onChange={(e) =>
                  setFormData({ ...formData, fname: e.target.value })
                }
                value={formData.fname}
                placeholder="First name"
                type="text"
                name="FNAME"
              />
              <input
                className="w-full p-2 bg-transparent border rounded-md text-white"
                onChange={(e) =>
                  setFormData({ ...formData, lname: e.target.value })
                }
                value={formData.lname}
                placeholder="Last name"
                type="text"
                name="LNAME"
              />
            </div>

            <input
              className="w-full p-2 bg-transparent border rounded-md text-white"
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              value={formData.company}
              placeholder="Organization"
              type="text"
              name="MERGE3"
            />

            <input
              className="w-full p-2 bg-transparent border rounded-md text-white"
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
              value={formData.about}
              placeholder="About yourself"
              type="text"
              name="MERGE5"
            />

            <button
              className="flex px-3 py-2 mx-auto bg-transparent border rounded-md text-white"
              type="submit"
            >
              <span className="hover:scale-110">Submit</span>
            </button>
          </form>
        </div>
        <div className="absolute bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
