export interface BlogObj {
    id: string;
    is_deleted?: boolean;
    blog_title: string;
    blog_images: string[];
    blog_description: string;
}

export interface OpenSourceObj {
    id: string;
    is_deleted?: boolean;
    open_source_title: string;
    icon_link: string;
    open_source_description: string;
    web_link: string;
    github_link: string;
}

export interface AppObj {
    id: string;
    is_deleted?: boolean;
    app_title: string;
    screenshots: string[];
    app_description: string;
    web_link: string;
    ios_app_link: string;
    android_app_link: string;
}

export interface TalkObj {
    id: string;
    is_deleted?: boolean;
    talk_title: string;
    talk_description: string;
    video_link: string;
}

export interface FilmObj {
    id: string;
    is_deleted?: boolean;
    film_title: string;
    film_description: string;
    video_link: string;
}