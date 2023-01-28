import { UpdateBlog } from "./blog.dto";

import { DescriptionSchema, TitleSchema } from "src/JoiSchema/JoiSchema";



export const validateBlogUpdateData = async (updateBlogData: UpdateBlog) => {
    if (updateBlogData.title === "" || updateBlogData.title) {
        await TitleSchema.validateAsync({ title: updateBlogData.title.trim() });
    }
    if (updateBlogData.description === "" || updateBlogData.description) {
        await DescriptionSchema.validateAsync({ description: updateBlogData.description.trim() });
    }
}

export const getInsensitiveEmail = (email: string): string => {
    const insensitiveEmail: string = email.slice(0, email.indexOf("@")).toLowerCase() +
        email.slice(email.indexOf("@"));
    return insensitiveEmail;
}