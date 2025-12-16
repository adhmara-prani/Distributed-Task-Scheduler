import express from "express";
import ridesRouter from "./routes/rides.route.js";
import connectToDb from "./connectToDB.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectToDb();

app.use(express.json());

app.use("/rides", ridesRouter);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
