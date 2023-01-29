import { Injectable, HttpException } from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { LoginSchema, SignUpSchema } from 'src/JoiSchema/JoiSchema';
import { CreateUser, Login, LoginUser, Success, } from 'src/dtos/user.dto';
import { getInsensitiveEmail, getResetPasswordToken } from 'src/dtos/UtilityFunction';
import { Request, Response } from 'express';
import { sendEmail } from 'src/dtos/UtilityFunction';


@Injectable()
export class UserService {


    async createUser(createUserData: CreateUser): Promise<Success> {
        try {
            try {
                await SignUpSchema.validateAsync({ email: createUserData.email, password: createUserData.password, confirmPassword: createUserData.confirmPassword, name: createUserData.name });
            } catch (error) {
                throw new HttpException(error.message, 400);
            }
            const insensitiveEmail: string = getInsensitiveEmail(createUserData.email);
            const isUser = await User.findOne({ where: { email: insensitiveEmail } });
            if (isUser) {
                throw new HttpException('Email already Exist', 400);
            }
            const user: User = new User();
            user.name = createUserData.name.trim();
            user.email = insensitiveEmail;
            const hashedPassword: string = await bcrypt.hashSync(createUserData.password, 10);
            user.password = hashedPassword;
            await user.save();
            return { success: true, message: "User created succesfully" };
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }


    async doUserLogin(loginData: LoginUser, response: Response): Promise<Login> {
        try {
            try {
                await LoginSchema.validateAsync({ email: loginData.email, password: loginData.password });
            } catch (error) {
                throw new HttpException(error.message, 400);
            }
            const insensitiveEmail = getInsensitiveEmail(loginData.email)
            const user = await User.findOne({ where: { email: insensitiveEmail } });
            if (user && bcrypt.compareSync(loginData.password, user.password)) {
                const token = jwt.sign({ id: user.id, time: Date.now() }, process.env.JWT_SECRET, { expiresIn: '24h' });
                delete user.password;
                response.cookie(process.env.COOKIE_NAME, token, { httpOnly: true, maxAge: Number(process.env.COOKIE_EXPIRE) });

                return { user, success: true };
            }
            else throw new HttpException('Invalid email or password', 400);
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, error.status);
        }
    }


    async forgotPassword(req: Request, email: string): Promise<Success> {
        const user: User | null = await User.findOne({ where: { email: email } });
        try {
            if (!user) {
                throw new HttpException('User not found with Email Id', 400);
            }

            const resetToken: string = getResetPasswordToken();

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
            await user.save();


            const resetPasswordUrl: string = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
            const message: string = `Your password reset link is \n\n  click to reset password \n ${resetPasswordUrl} \n\n If you have not requested this email then please igore it.`;

            const mailResponse: boolean = await sendEmail(email, "Forgot password request | CAUSAL FUNNEL", message);
            if (mailResponse) {
                return { success: true, message: `Check your Inbox We've sent an Reset Password Email to Mail Id ${email}` }
            }
            else throw new HttpException('Unable to send Email ', 500);

        } catch (error) {
            console.log(error)
            if (user) {

                user.resetPasswordToken = null;
                user.resetPasswordExpire = null;
                await user.save();
            }
            throw new HttpException(error.message, error.status);
        }
    }


    async resetPassword(token: string, password: string, confirmPassword: string): Promise<Success> {

        try {

            const user: User | null = await User.findOne({
                where: { resetPasswordToken: token }
            });

            //if user does not exist
            if (!user) {
                throw new HttpException('Reset password token is invalid', 400);
            }
            if (user.resetPasswordExpire && user.resetPasswordExpire < Date.now()) {

                throw new HttpException('Reset Password Token Expired', 400);
            }
            //confirm password
            if (password != confirmPassword) {
                throw new HttpException('Password and Confirm Pasword does not match', 400);
            }

            const hashedPassword: string = await bcrypt.hashSync(password, 10);

            user.password = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null;


            await user.save();
            return { success: true, message: "Password updated succesfully" }
        } catch (error) {
            throw new HttpException(error.message, error.status);

        }
    }

    async getUsers(): Promise<any> {
        try {
            const users = await User.find();
            return { users };
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

}