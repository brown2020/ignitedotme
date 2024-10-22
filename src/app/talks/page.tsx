"use client";

import Vimeo from "@/components/Vimeo";
import React, { useEffect, useState } from "react";
import { fetchDocuments } from "../lib/utils/firestoreUtils";

interface Talk {
    id: string;
    is_deleted: boolean;
    talk_title: string;
    talk_description: string;
    video_link: string;
}

const Talks: React.FC = () => {
    const [talks, setTalks] = useState<Talk[]>([]);

    useEffect(() => {
        fetchTalks();
    }, []);

    const fetchTalks = async () => {
        const talksList = await fetchDocuments('talks');

        const mappedTalks = talksList.map(talk => ({
            id: talk.id,
            is_deleted: talk.is_deleted || false,
            talk_title: talk.talk_title,
            talk_description: talk.talk_description,
            video_link: talk.video_link,
        }));

        setTalks(mappedTalks as Talk[]);
    };

    return (
        <div className="mb-5 space-y-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 p-2 container mx-auto talks-section">
            {talks?.filter((f) => !f.is_deleted)?.map((talk) => (
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
