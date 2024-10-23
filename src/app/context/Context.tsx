"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppObj, BlogObj, FilmObj, OpenSourceObj, TalkObj } from '../types/models';

interface PageProps {
    films: FilmObj[];
    talks: TalkObj[];
    apps: AppObj[];
    openSources: OpenSourceObj[];
    blogs: BlogObj[];
}

interface ContextType {
    data: PageProps;
    setData: React.Dispatch<React.SetStateAction<PageProps>>;
}

const CreateContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<PageProps>({ films: [], talks: [], apps: [], openSources: [], blogs: [] });

    return (
        <CreateContext.Provider value={{
            data,
            setData
        }}>
            {children}
        </CreateContext.Provider>
    );
};

export const Context = () => {
    const context = useContext(CreateContext);
    if (context === undefined) {
        throw new Error('Context must be used within a ContextProvider');
    }
    return context;
};
