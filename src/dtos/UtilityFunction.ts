import { UpdateBlog } from "./blog.dto";
import * as  crypto from 'crypto';

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

export const getResetPasswordToken = (): string => {

    //GENERATING TOKEN
    const resetToken: string = crypto.randomBytes(20).toString('hex');

    return resetToken;
}