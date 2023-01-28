import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUser, Login, LoginUser, Success } from 'src/dtos/user.dto';
import { UserService } from './user.service';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/signup')
    createUser(@Body() createUserData: CreateUser): Promise<Success> {
        return this.userService.createUser(createUserData);
    }

    @Post('/login')
    doUserLogin(@Body() loginData: LoginUser, @Res({ passthrough: true }) response: Response): Promise<Login> {
        response.cookie('jwt', "hello", { httpOnly: true, });
        return this.userService.doUserLogin(loginData);
    }

}
