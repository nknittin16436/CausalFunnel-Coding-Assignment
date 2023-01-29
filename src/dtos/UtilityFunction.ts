import { UpdateBlog } from "./blog.dto";
import * as  crypto from 'crypto';
import * as nodemailer from 'nodemailer';

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




export const sendEmail = async (recipient: string, subject: string, url: string): Promise<boolean> => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: `"Causal Funnel" <${process.env.MAILER_EMAIL}>`,
            to: recipient,
            subject: subject,
            text: url
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }

}
