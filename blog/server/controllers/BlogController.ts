import { Request, Response } from "express";
import { IBlogController } from "../interfaces/IBlogController";
import { BlogService } from "../services/BlogService";

export class BlogController implements IBlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  async getAllBlogs(req: Request, res: Response): Promise<Response> {
    try {
      const blogs = await this.blogService.getAllBlogs();
      return res.json(blogs);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching blogs", error });
    }
  }

  async createBlog(req: Request, res: Response): Promise<Response> {
    try {
      const { title, content, author } = req.body;
      const newBlog = await this.blogService.createBlog({ title, content, author });
      return res.status(201).json(newBlog);
    } catch (error) {
      return res.status(500).json({ message: "Error creating blog", error });
    }
  }

  async updateBlog(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, content, author } = req.body;

      const updatedBlog = await this.blogService.updateBlog(Number(id), { title, content, author });
      if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

      return res.json(updatedBlog);
    } catch (error) {
      return res.status(500).json({ message: "Error updating blog", error });
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const isDeleted = await this.blogService.deleteBlog(Number(id));

      if (!isDeleted) return res.status(404).json({ message: "Blog not found" });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting blog", error });
    }
  }
}
