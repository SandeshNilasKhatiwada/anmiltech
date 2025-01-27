import { z } from "zod";

// Blog Validation Schema
export const BlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long"),
  author: z.string().min(2, "Author name must be at least 2 characters long"),
});
