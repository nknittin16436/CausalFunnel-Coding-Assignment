import { Injectable, HttpException } from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { LoginSchema, SignUpSchema } from 'src/JoiSchema/JoiSchema';
import { CreateUser, Login, LoginUser, Success, } from 'src/dtos/user.dto';
import { getInsensitiveEmail } from 'src/dtos/UtilityFunction';

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
            return { success: true };
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }


    async doUserLogin(loginData: LoginUser): Promise<Login> {
        try {
            try {
                await LoginSchema.validateAsync({ email: loginData.email, password: loginData.password });
            } catch (error) {
                throw new HttpException(error.message, 400);
            }
            const insensitiveEmail = getInsensitiveEmail(loginData.email)
            const user = await User.findOne({ where: { email: insensitiveEmail } });
            if (user && bcrypt.compareSync(loginData.password, user.password)) {
                const token = jwt.sign({ id: user.id, time: Date.now() }, 'causalfunnel', { expiresIn: '24h' });
                delete user.password;
                return { user, accessToken: token, success: true };
            }
            else throw new HttpException('Invalid email or password', 400);
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, error.status);
        }
    }


}