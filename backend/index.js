import express from "express";
import ridesRouter from "./routes/rides.route.js";

const app = express();

app.use("/rides", ridesRouter);

app.listen(5000, () => {
  console.log(`Server running at port 5000`);
});
