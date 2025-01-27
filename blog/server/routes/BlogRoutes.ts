import express from "express";
import { BlogController } from "../controllers/BlogController";
import { validate } from "../middlewares/validate";
import { BlogSchema } from "../validations/BlogValidation";

const router = express.Router();
const blogController = new BlogController();

// Get all blogs (no validation needed)
router.get("/", async(req, res) => {
  await blogController.getAllBlogs(req, res);
});

// Create a new blog (validate input)
router.post("/", validate(BlogSchema), async(req, res) => {await blogController.createBlog(req, res)});

// Update an existing blog (validate input)
router.put("/:id", validate(BlogSchema), async(req, res) => {await blogController.updateBlog(req, res)});

// Delete a blog (no validation needed)
router.delete("/:id", async (req, res) => { await blogController.deleteBlog(req, res) });

export default router;
