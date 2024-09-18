import Link from "next/link";
import React from "react";
import { ChevronDown } from "lucide-react"; // Import ChevronDown

interface IVimeoProps {
  id: string;
  source: string;
  title: string;
  subtitle: string;
  link: string;
  next: string;
  text: string; // Updated text to string
}

const Vimeo: React.FC<IVimeoProps> = ({
  id,
  source,
  title,
  subtitle,
  link,
  next,
  text,
}) => {
  return (
    <div className="flex flex-col space-y-3" id={id}>
      <div className="videoWrapper">
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
      <div className="flex flex-col max-w-2xl px-2 mx-auto my-4 space-y-2 text-center mx-sm-5">
        <a href={link}>
          <h2>{title}</h2>
          <h5 className="italic">{subtitle}</h5>
        </a>
        {/* Render text string */}
        <p>{text}</p>
        {/* Chevron icon */}
        <Link href={next}>
          <div className="flex items-center justify-center w-full pt-12 cursor-pointer">
            <ChevronDown size={32} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Vimeo;
