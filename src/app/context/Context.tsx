"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import {
  AppObj,
  BlogObj,
  FilmObj,
  OpenSourceObj,
  TalkObj,
} from "../types/models";
import { fetchDocuments, getDocumentById } from "@/firebase/firestoreUtils";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { DocumentData } from "firebase/firestore";

interface PageProps {
  films: FilmObj[];
  talks: TalkObj[];
  apps: AppObj[];
  openSources: OpenSourceObj[];
  blogs: BlogObj[];
}

interface ContextType {
  data: PageProps;
  user: DocumentData | null;
  userLogin: (userData: DocumentData | null) => void;
  userLogout: () => void;
}

const CreateContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<DocumentData | null>(null);
  const [data, setData] = useState<PageProps>({
    films: [],
    talks: [],
    apps: [],
    openSources: [],
    blogs: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const userDoc = await getDocumentById("users", currentUser.uid);
          if (userDoc) {
            userLogin(userDoc);
          } else {
            userLogin(null);
          }
        } else {
          userLogin(null);
        }
      } catch (error) {
          console.log(error, "error");
          userLogin(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAllData = useCallback(async () => {
    const fetchBlogs = async () => {
      const blogsList = await fetchDocuments("blogs");

      const mappedBlogs = blogsList.map((blog) => ({
        id: blog.id,
        is_deleted: blog.is_deleted || false,
        blog_title: blog.blog_title,
        blog_images: blog.blog_images,
        blog_description: blog.blog_description,
      }));

      setData((prevState) => ({
        ...prevState,
        blogs: mappedBlogs as BlogObj[],
      }));
    };

    const fetchOpenSources = async () => {
      const openSourcesList = await fetchDocuments("open_sources", {
        sort_by: "order_number",
        order: "asc",
      });

      const mappedOpenSources = openSourcesList.map((openSource) => ({
        id: openSource.id,
        is_deleted: openSource.is_deleted || false,
        open_source_title: openSource.open_source_title,
        icon_link: openSource.icon_link,
        open_source_description: openSource.open_source_description,
        web_link: openSource.web_link || "",
        github_link: openSource.github_link || "",
      }));

      setData((prevState) => ({
        ...prevState,
        openSources: mappedOpenSources as OpenSourceObj[],
      }));
    };

    const fetchApps = async () => {
      const appsList = await fetchDocuments("apps", {
        sort_by: "order_number",
        order: "asc",
      });

      const mappedApps = appsList.map((app) => ({
        id: app.id,
        is_deleted: app.is_deleted || false,
        app_title: app.app_title,
        screenshots: (app.screenshots as string[]) || [],
        app_description: app.app_description,
        web_link: app.web_link || "",
        ios_app_link: app.ios_app_link || "",
        android_app_link: app.android_app_link || "",
      }));

      setData((prevState) => ({ ...prevState, apps: mappedApps as AppObj[] }));
    };

    const fetchTalks = async () => {
      const talksList = await fetchDocuments("talks", {
        sort_by: "order_number",
        order: "asc",
      });

      const mappedTalks = talksList.map((talk) => ({
        id: talk.id,
        is_deleted: talk.is_deleted || false,
        talk_title: talk.talk_title,
        talk_description: talk.talk_description,
        video_link: talk.video_link,
      }));

      setData((prevState) => ({
        ...prevState,
        talks: mappedTalks as TalkObj[],
      }));
    };

    const fetchFilms = async () => {
      const filmsList = await fetchDocuments("films", {
        sort_by: "order_number",
        order: "asc",
      });

      const mappedFilms = filmsList.map((film) => ({
        id: film.id,
        is_deleted: film.is_deleted || false,
        film_title: film.film_title,
        film_description: film.film_description,
        video_link: film.video_link,
      }));

      setData((prevState) => ({
        ...prevState,
        films: mappedFilms as FilmObj[],
      }));
    };

    await Promise.all([
      fetchBlogs(),
      fetchOpenSources(),
      fetchApps(),
      fetchTalks(),
      fetchFilms(),
    ]);
  }, [setData]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const userLogin = (userData: DocumentData | null) => {
    setUser(userData);
  };

  const userLogout = async () => {
    try {
      await signOut(auth);

      setUser(null);
      router.push("/admin/signup");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("An error occurred while signing out.");
    }
  };

  return (
    <CreateContext.Provider
      value={{
        data,
        user,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export const Context = () => {
  const context = useContext(CreateContext);
  if (context === undefined) {
    throw new Error("Context must be used within a ContextProvider");
  }
  return context;
};
