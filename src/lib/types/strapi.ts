export interface StrapiResponse<T> {
    data: T;
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface Article {
    id: number;
    documentId: string; // Strapi v5
    title: string;
    description: string;
    slug: string;
    cover?: { data: { attributes: StrapiImage } };
}

export interface AboutPage {
    id: number;
    title: string;
    blocks: AboutBlock[];
}

export interface StrapiImage {
    url: string;
    alternativeText?: string;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
    };
}

export type AboutBlock = {
    __component: string;
    id: number;
    title?: string;
    body?: string;
    image?: { data: { attributes: StrapiImage } };
};