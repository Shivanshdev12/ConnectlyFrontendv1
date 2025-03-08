export interface IPost{
    _id?:string;
    title?:string;
    description?:string;
    image?:string;
    user?:any;
    createdAt?:string;
    likes?:[];
    dislikes?:number;
}