import { Blog } from "src/db/entities/blog.entity";

export interface CreateBlog {
    title: string;
    description: string;
}

export interface UpdateBlog {
    title: string;
    description: string;
}



export interface GetBlogs {
    blogs: Blog[];
    success: boolean;
}

