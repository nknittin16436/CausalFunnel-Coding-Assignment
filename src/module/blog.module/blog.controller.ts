import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards, Headers, Query } from '@nestjs/common';
import { CreateBlog, GetBlogs, UpdateBlog } from 'src/dtos/blog.dto';
import { Success } from 'src/dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { BlogService } from './blog.service';
@Controller('/blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    


    @UseGuards(AuthGuard)
    @Post('')
    createBlog(@Body() createBlogData: CreateBlog): Promise<Success> {
        return this.blogService.createBlog(createBlogData);
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateBlog(@Body() updateBlogData: UpdateBlog, @Param('id') id: string): Promise<Success> {
        return this.blogService.updateBlog(id, updateBlogData);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: string): Promise<Success> {
        return this.blogService.deleteBlog(id);
    }

}
