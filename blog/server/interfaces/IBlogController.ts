import { Request, Response } from "express";

export interface IBlogController {
  getAllBlogs(req: Request, res: Response): Promise<Response>;
  createBlog(req: Request, res: Response): Promise<Response>;
  updateBlog(req: Request, res: Response): Promise<Response>;
  deleteBlog(req: Request, res: Response): Promise<Response>;
}
