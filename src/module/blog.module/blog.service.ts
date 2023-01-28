import { Injectable, HttpException } from '@nestjs/common';
import { BlogSuccess, CreateBlog, GetBlogs, UpdateBlog } from 'src/dtos/blog.dto';
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
            throw new HttpException(error.message, 400);
        }
    }


    async createBlog(createBlogData: CreateBlog): Promise<BlogSuccess> {
        try {
            if (createBlogData.title || createBlogData.description === "") {
                if (createBlogData.title.trim().length < 1) {
                    throw new HttpException(`Title cannot be empty or can't contain white spaces `, 400);
                }

            }
            if (createBlogData.description || createBlogData.description === "") {
                if (createBlogData.description.trim().length < 2) {
                    throw new HttpException(`Description cannot be empty or can't contain white spaces `, 400);
                }

            }
            if (createBlogData.title && createBlogData.description) {

                const blog = new Blog();
                blog.title = createBlogData.title.trim();
                blog.description = createBlogData.description.trim();
                blog.createdAt = Date.now();
                await blog.save();
                return { success: true, message: "Blog created successfully" };
            }
            else throw new HttpException('Please provide both title and desciption for blog', 400);

        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    async updateBlog(id: string, updateBlogData: UpdateBlog): Promise<BlogSuccess> {
        try {
            if (updateBlogData.title || updateBlogData.description === "") {
                if (updateBlogData.title.trim().length < 1) {
                    throw new HttpException(`Title cannot be empty or can't contain white spaces `, 400);
                }

            }
            if (updateBlogData.description || updateBlogData.description === "") {
                if (updateBlogData.description.trim().length < 2) {
                    throw new HttpException(`Description cannot be empty or can't contain white spaces `, 400);
                }

            }
            const blog: Blog | null = await Blog.findOne({
                where: { id: id }
            }
            );
            if (blog) {
                await Blog.update(id, { ...updateBlogData });
                return { success: true, message: "Blog updated successfully" }
            }
            else throw new HttpException('Unable to update Blog  or Invalid blog Id', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    async deleteBlog(id: string): Promise<BlogSuccess> {
        try {
            const blog = await Blog.findOne({ where: { id: id } });
            if (blog) {
                await Blog.delete(id);
                return { success: true, message: "Blog deleted successfully" }
            }
            else throw new HttpException('Unable to delete Blog / Blog not Found', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

}