import pool from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

const connectToDb = async () => {
  try {
    const connection = await pool.query("SELECT NOW()");
    console.log(connection.rows[0], "Database connected successfully!");
  } catch (error) {
    console.log(error, "Database connection failed!");
    process.exit(1);
  }
};

export default connectToDb;
