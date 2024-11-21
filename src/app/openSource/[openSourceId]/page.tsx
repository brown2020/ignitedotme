"use client";

import Carousel from "@/app/components/Carousal";
import { Modal } from "@/app/components/Modal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { openSources } from "@/data/openSource";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const OpenSourceDetails: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { openSourceId } = useParams();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const openSource = openSources.find((f) => f.id === openSourceId);

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

  if (!openSource) {
    return <div>App not found</div>;
  }

  return (
    <div className="flex flex-col h-lvh  space-y-5">
      <div className="wrapeer">
        <Navbar />

        <div className="container container-fluid-custom mx-auto text-black main-container">
          <div
            className="film-Details-title container  font-bold text-center mt-3 py-9"
            data-aos="fade-down"
          >
            <h2 className="text-4xl font-bold border-title text-white relative main-text-tital">
              {openSource.title}
            </h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-2 open-sources-contant">
            <div
              className="w-full flex flex-col items-center justify-center"
              data-aos="fade-up"
            >
              {openSource.screenshots?.length > 0 ? (
                <Carousel
                  slides={openSource.screenshots}
                  setShowModal={setShowModal}
                />
              ) : (
                <Image
                  src={openSource.source}
                  alt={openSource.title}
                  className="mx-auto"
                />
              )}
            </div>
            <div className="details py-0 detail-section" data-aos="fade-right">
              <div className="mb-1 pb-2 flex justify-end  items-center pl-2">
                <div className="mr-2 flex gap-3 items-center">
                  <div className="footer-icon_second flex space-x-2">
                    {openSource.webLink !== "" && (
                      <Link href={openSource.webLink} target="_blank">
                        <i className="fa-solid text-white fa-globe"></i>
                      </Link>
                    )}
                    {openSource.gitLink !== "" && (
                      <Link href={openSource.gitLink} target="_blank">
                        <i className="fa-brands text-white fa-github"></i>
                      </Link>
                    )}
                    {openSource.iosLink !== "" && (
                      <Link href={openSource.iosLink} target="_blank">
                        <i className="fa-brands text-white fa-apple"></i>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              {openSource.subtitle !== "" && (
                <h5 className="text-left p-2 text-white">
                  {openSource.subtitle}
                </h5>
              )}
              <p className="p-2 text-white whitespace-pre-wrap">
                {openSource.text}
              </p>
            </div>
          </div>
        </div>

        <div className="bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto footer_icon">
          <Footer />
        </div>
      </div>

      {/* Modal on click of slider image */}
      {showModal && (
        <Modal show={showModal}>
          <>
            <button
              type="button"
              className="z-30 absolute top-0 right-0 px-4 py-2 bg-red-500 text-white"
              onClick={() => setShowModal(false)}
            >
              <i className="fa fa-close"></i>
            </button>
            <div className="relative h-full overflow-hidden rounded-lg modal-slider-main">
              <Slider {...settings}>
                {openSource.screenshots.map((slide, index) => (
                  <div key={index}>
                    <Image
                      src={slide.src}
                      className="block w-full h-full object-cover image-section cursor-pointer"
                      alt={slide.alt}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};

export default OpenSourceDetails;
