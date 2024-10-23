"use client";

import Vimeo from "@/components/Vimeo";
import React from "react";
import { Context } from "../context/Context";

const Talks: React.FC = () => {
    const { data } = Context();

    return (
        <div className="mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto talks-section">
            {data.talks?.filter((f) => !f.is_deleted)?.map((talk) => (
                <Vimeo
                    key={talk.id}
                    id={talk.id}
                    source={talk.video_link}
                    title={talk.talk_title}
                    text={talk.talk_description}
                    details="talks"
                />
            ))}
        </div>
    );
};

export default Talks;
