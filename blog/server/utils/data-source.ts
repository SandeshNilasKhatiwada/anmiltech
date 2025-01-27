import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", // Set an invalid host or port
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["models/**/*.ts"],
  });
  