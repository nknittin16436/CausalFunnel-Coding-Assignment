import { Body, Controller, Post, Res, Get, Query } from '@nestjs/common';
import { Response } from 'express';
import { GetBlogs } from 'src/dtos/blog.dto';
import { CreateUser, Login, LoginUser, Success } from 'src/dtos/user.dto';
import { BlogService } from '../blog.module/blog.service';
import { UserService } from './user.service';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly blogService: BlogService
    ) { }

    @Post('/signup')
    createUser(@Body() createUserData: CreateUser): Promise<Success> {
        return this.userService.createUser(createUserData);
    }

    @Post('/login')
    doUserLogin(@Body() loginData: LoginUser, @Res({ passthrough: true }) response: Response): Promise<Login> {
        return this.userService.doUserLogin(loginData, response);
    }

    @Get('')
    getBlogs(@Query('page') page: number): Promise<GetBlogs> {
        return this.blogService.getAllBlogs(page);
    }

}
