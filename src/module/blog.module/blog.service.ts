import { Injectable, HttpException } from '@nestjs/common';
import { AddBlogSchema } from 'src/JoiSchema/joiSchema';
import { CreateBlog, GetBlogs, UpdateBlog } from 'src/dtos/blog.dto';
import { Success } from 'src/dtos/user.dto';
import { validateBlogUpdateData } from 'src/dtos/UtilityFunction';
import { Blog } from 'src/db/entities/blog.entity';
const pageSize = 10;
@Injectable()
export class BlogService {

    async getAllBlogs(page: number = 1): Promise<GetBlogs> {
        try {

            const blogs: Blog[] = await Blog.find();
            const paginatedBlogs: Blog[] = blogs.slice((page - 1) * pageSize, page * pageSize);
            return { blogs: paginatedBlogs, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }


    async createBlog(createBlogData: CreateBlog): Promise<Success> {
        try {
            // try {
            //     await AddBlogSchema.validateAsync({ title: createBlogData.title.trim(), description: createBlogData.description.trim() });
            // } catch (error) {
            //     throw new HttpException(error.message, 400);
            // }
            const blog = new Blog();
            blog.title = createBlogData.title.trim();
            blog.description = createBlogData.description.trim();
            blog.createdAt = Date.now();
            await blog.save();
            // console.log(blog);
            return { success: true };
        } catch (error) {
            // console.log(error);
            throw new HttpException(error, error.status);

        }
    }

    async updateBlog(id: string, updateBlogData: UpdateBlog): Promise<Success> {
        try {
            // await validateBlogUpdateData(updateBlogData);
            const blog: Blog | null = await Blog.findOne({
                where: { id: id }
            }
            );
            if (blog) {
                await Blog.update(id, { ...updateBlogData });
                return { success: true }
            }
            else throw new HttpException('Unable to update Blog  or Invalid blog Id', 400);
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, error.status);
        }
    }

    async deleteBlog(id: string): Promise<Success> {
        try {
            const blog = await Blog.findOne({ where: { id: id } });
            if (blog) {
                await Blog.delete(id);
                return { success: true }
            }
            else throw new HttpException('Unable to delete Blog / Blog not Found', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

}