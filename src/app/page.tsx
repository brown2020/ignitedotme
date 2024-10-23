"use client";

import Image, { StaticImageData } from "next/image";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";
import Apps from "./apps/page";
import Talks from "./talks/page";
import Film from "./film/page";
import { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import OpenSources from "./openSource/page";
import { mainBanner } from "@/data/mainBanner";
import Navbar from "@/components/Navbar";
import Blogs from "./blogs/page";
import { fetchDocuments } from "@/firebase/firestoreUtils";
import { AppObj, BlogObj, FilmObj, OpenSourceObj, TalkObj } from "./types/models";
import { Context } from "./context/Context";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    lname: "",
    company: "",
    about: "",
  });
  const { data, setData } = Context();

  const fetchAllData = useCallback(async () => {
    const fetchBlogs = async () => {
      const blogsList = await fetchDocuments('blogs');

      const mappedBlogs = blogsList.map(blog => ({
        id: blog.id,
        is_deleted: blog.is_deleted || false,
        blog_title: blog.blog_title,
        blog_images: blog.blog_images,
        blog_description: blog.blog_description
      }));

      setData((prevState) => ({ ...prevState, blogs: mappedBlogs as BlogObj[] }));
    };

    const fetchOpenSources = async () => {
      const openSourcesList = await fetchDocuments('open_sources');

      const mappedOpenSources = openSourcesList.map(openSource => ({
        id: openSource.id,
        is_deleted: openSource.is_deleted || false,
        open_source_title: openSource.open_source_title,
        icon_link: openSource.icon_link,
        open_source_description: openSource.open_source_description,
        web_link: openSource.web_link || "",
        github_link: openSource.github_link || "",
      }));

      setData((prevState) => ({ ...prevState, openSources: mappedOpenSources as OpenSourceObj[] }));
    };

    const fetchApps = async () => {
      const appsList = await fetchDocuments('apps');

      const mappedApps = appsList.map(app => ({
        id: app.id,
        is_deleted: app.is_deleted || false,
        app_title: app.app_title,
        screenshots: app.screenshots as string[] || [],
        app_description: app.app_description,
        web_link: app.web_link || "",
        ios_app_link: app.ios_app_link || "",
        android_app_link: app.android_app_link || "",
      }));

      setData((prevState) => ({ ...prevState, apps: mappedApps as AppObj[] }));
    };

    const fetchTalks = async () => {
      const talksList = await fetchDocuments('talks');

      const mappedTalks = talksList.map(talk => ({
        id: talk.id,
        is_deleted: talk.is_deleted || false,
        talk_title: talk.talk_title,
        talk_description: talk.talk_description,
        video_link: talk.video_link,
      }));

      setData((prevState) => ({ ...prevState, talks: mappedTalks as TalkObj[] }));
    };

    const fetchFilms = async () => {
      const filmsList = await fetchDocuments('films');

      const mappedFilms = filmsList.map(film => ({
        id: film.id,
        is_deleted: film.is_deleted || false,
        film_title: film.film_title,
        film_description: film.film_description,
        video_link: film.video_link,
      }));

      setData((prevState) => ({ ...prevState, films: mappedFilms as FilmObj[] }));
    };

    await Promise.all([fetchBlogs(), fetchOpenSources(), fetchApps(), fetchTalks(), fetchFilms()]);
  }, [setData]);

  useEffect(() => {
    if (videoRef.current) { videoRef.current.play(); }

    fetchAllData();
  }, [fetchAllData]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
    arrows: true,
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
    const headerOffset = 78; // Height of your sticky header
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;

      let offsetTop = 0;
      if (header) offsetTop = header.offsetTop;

      const offsetPosition =
        window.scrollY > offsetTop
          ? elementPosition + window.scrollY - headerOffset
          : elementPosition - headerOffset - headerOffset + headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col flex-1 w-full" id="home">
        {/* Header image */}
        <Slider {...settings} className="slider-block">
          {mainBanner?.map((item) => {
            return (
              <div
                className="relative h-screen -mt-16 lg:-mt-24 w-full main-slider-section"
                key={item.id}
              >
                {item.type === "video" ? (
                  <div className="w-full slide-video">
                    <iframe
                      src={`https://player.vimeo.com/video/${item.source as string
                        }?autoplay=1&loop=auto&muted=1&background=1&title=0&byline=0&portrait=0`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full object-contain"
                    ></iframe>
                  </div>
                ) : (
                  <Image
                    src={item.source as StaticImageData}
                    alt="skydiver"
                    fill
                    className="object-cover h-full w-full"
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full text-contant-section z-10">
                  <div className="flex flex-col max-w-4xl pt-1">
                    <h1
                      className="text-center font-black hero_title"
                      data-aos="fade-down"
                    >
                      IGNITE
                    </h1>
                    <p
                      className="mx-5 text-center hero_details"
                      data-aos="fade-up"
                    >
                      Ignite Channel produces and distributes innovative
                      documentary films and media technology.{" "}
                      <span
                        className="underline cursor-pointer text-highlight"
                        onClick={() => scrollToSection("film")}
                      >
                        Check out
                      </span>{" "}
                      our recent work.{" "}
                      <span
                        className="underline cursor-pointer text-highlight"
                        onClick={() => scrollToSection("sign-up")}
                      >
                        Sign up
                      </span>{" "}
                      to get notified about upcoming film productions and
                      events.
                    </p>
                  </div>

                  <div>
                    <div
                      className="flex items-center justify-center w-full mt-auto mb-3 cursor-pointer"
                      onClick={() => scrollToSection("film")}
                    >
                      <ChevronDown size={32} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>

        {
          data.films?.length > 0 &&
          <>
            {/* Film section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="film">
              <div className="container mx-auto">
                <h1
                  className="text-center  text-4xl text-title relative text-white capitalize section-title"
                  data-aos="fade-down"
                >
                  Film
                </h1>
                <p
                  className="text-center mt-3 pt-5 w-full max-w-3xl m-auto text-white text-2xl p-2"
                  data-aos="fade"
                >
                  Exploring the human experience through documentary features on
                  art, culture, science, and society.
                </p>
              </div>
            </div>
            <Film />
          </>
        }

        {
          data.talks?.length > 0 &&
          <>
            {/* Talks section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="talks">
              <h1
                className="text-center  text-title relative text-white capitalize"
                data-aos="fade-down"
              >
                Talks
              </h1>
              <p
                className="text-center mt-3 pt-5 w-full  max-w-3xl m-auto text-white text-2xl p-2"
                data-aos="fade"
              >
                Inspiring ideas on technology, AI, and film: Keynotes and TEDx talks
                that spark innovation.
              </p>
            </div>
            <Talks />
          </>
        }

        {
          data.apps?.length > 0 &&
          <>
            {/* Apps section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="apps">
              <h1
                className="text-center  text-title relative text-white capitalize"
                data-aos="fade-down"
              >
                Apps
              </h1>
              <p
                className="text-center mt-3 pt-5 w-full  max-w-3xl m-auto text-white text-2xl p-2"
                data-aos="fade"
              >
                Discover apps from self-development to augmented reality, designed
                to enhance your experience.
              </p>
            </div>
            <Apps />
          </>
        }

        {
          data.openSources?.length > 0 &&
          <>
            {/* Open source section */}
            <div className="mt-5 mb-2 pt-5 pb-2" id="openSource">
              <h1
                className="text-center  text-title relative text-white capitalize"
                data-aos="fade-down"
                data-aos-duration="2s"
              >
                Open Source
              </h1>
              <p
                className="text-center mt-3 pt-5 w-full  max-w-3xl m-auto text-white text-2xl p-2"
                data-aos="fade"
              >
                Empowering creativity through collaboration: Explore, contribute,
                and innovate with our open-source projects.
              </p>
            </div>
            <OpenSources />
          </>
        }

        {/* Blogs section */}
        {
          data.blogs?.length > 0 &&
          <>
            <div className="mt-5 mb-2 pt-5 pb-2" id="blogs">
              <h1
                className="text-center  text-title relative text-white capitalize"
                data-aos="fade-down"
                data-aos-duration="2s"
              >
                Blogs
              </h1>
              <p
                className="text-center mt-3 pt-5 w-full  max-w-3xl m-auto text-white text-2xl p-2"
                data-aos="fade"
              >
                Empowering creativity through collaboration: Explore, contribute,
                and innovate with our open-source projects.
              </p>
            </div>
            <Blogs />
          </>
        }

        {/* Signup section */}
        <div
          className="bg-[url('../app/assets/ignite-header.jpeg')] footer_bg_img bg-cover bg-center bg-no-repeat footer_bg_img mt-10 relative flex flex-col items-center w-full"
          id="sign-up"
        >
          <div className="container py-16 z-10">
            <div
              className="signup_deatiles px-20 mx-20 mb-10 text-center"
              data-aos="fade-right"
            >
              <h3 className="text-4xl font-bold text-white section_title mb-3">
                Passionate about innovative media? Stay in touch!
              </h3>
              <p className="text-white text-2xl">
                Ignite Channel is an independent film and mediatech producer
                devoted to creators who seek to make the world a better place.
                We value passionate curiosity, fearless creativity, and a
                collaborative spirit. Sign up to learn more.
              </p>
            </div>
            <div
              className="sigup-form backdrop-blur-sm flex flex-col items-center justify-center h-full max-w-7xl	px-6 py-10 rounded-lg text-center z-10 mx-auto shadow-2xl"
              data-aos="fade-left"
            >
              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                  placeholder="Email address"
                  type="email"
                  name="EMAIL"
                  className="w-full py-4 px-6 bg-gray-100 border border-gray-300 rounded-lg"
                />

                <div className="flex space-x-4">
                  <input
                    className="w-full py-4 px-6 bg-gray-100 border border-gray-300 rounded-lg"
                    onChange={(e) =>
                      setFormData({ ...formData, fname: e.target.value })
                    }
                    value={formData.fname}
                    placeholder="First name"
                    type="text"
                    name="FNAME"
                  />
                  <input
                    className="w-full py-4 px-6 bg-gray-100 border border-gray-300 rounded-lg"
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
                  className="w-full py-4 px-6 bg-gray-100 border border-gray-300 rounded-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  value={formData.company}
                  placeholder="Organization"
                  type="text"
                  name="MERGE3"
                />

                <input
                  className="w-full py-4 px-6 bg-gray-100 border border-gray-300 rounded-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                  }
                  value={formData.about}
                  placeholder="About yourself"
                  type="text"
                  name="MERGE5"
                />

                <button
                  className="py-4 px-8 form-btn text-white rounded-xl font-semibold shadow-lg hover:shadow-none"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full footer_icon">
          <Footer />
        </div>
      </div>
    </>
  );
}
