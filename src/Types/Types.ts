export type Book={
    id:number|null;
    description:string|null;
    pagesCount:number|null;
    publisherId:number|null;
    publishedDate:string|null;
    authorsIds:number[]|null;
    genresIds:number[]|null;
    publishedCountry:string|null;
    originalTitle:string|null;
}
export type Publisher={
    id:number|null;
    name:String|null;
    country:string|null;
    booksIds:number[]|null;
}
export type Author={
    id:number|null;
    birhday:string|null;
    booksIds:number[]|null;
    country:string|null;
    fullName:string|null;
}
export type Genre={
    id:number|null;
    name:String|null;
    description:string|null;
}