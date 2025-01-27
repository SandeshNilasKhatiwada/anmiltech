import express, { Application } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./utils/data-source";
import blogRoutes from "./routes/BlogRoutes";

dotenv.config();

const app: Application = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.use("/api/blogs", blogRoutes);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });
