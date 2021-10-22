export interface bookData {
    _id: number;
    title: string;
    authors: string[];
    categories: string[];
    shortDescription: string;
    longDescription: string;
    isbn: string;
    pageCount: number;
    publishedDate: any;
    thumbnailUrl: string;
    status: string;
}

export interface IDate {
    $date: string;
}