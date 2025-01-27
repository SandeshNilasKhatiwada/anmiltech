import { Repository } from "typeorm";
import { Blog } from "../models/Blog";
import {AppDataSource }from "../utils/data-source";

export class BlogService {
  private blogRepository: Repository<Blog>;

  constructor() {
    this.blogRepository = AppDataSource.getRepository(Blog);
  }

  async getAllBlogs(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async createBlog(data: Partial<Blog>): Promise<Blog> {
    const newBlog = this.blogRepository.create(data);
    return await this.blogRepository.save(newBlog);
  }

  async updateBlog(id: number, data: Partial<Blog>): Promise<Blog | null> {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) return null;

    Object.assign(blog, data);
    return await this.blogRepository.save(blog);
  }

  async deleteBlog(id: number): Promise<boolean> {
    const result = await this.blogRepository.delete(id);
    return result.affected ? true : false;
  }
}
