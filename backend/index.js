import express from "express";
import ridesRouter from "./routes/rides.route.js";
import connectToDb from "./connectToDB.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { connectProducer } from "./utils/kafka.util.js";
import { connectConsumer } from "./utils/kafkaConsumer.util.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // for dev purposes
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

connectToDb();

app.use(express.json());

app.use("/rides", ridesRouter);

const myServer = async () => {
  // connect to p
  await connectProducer();

  // connect to c
  await connectConsumer(io);

  // listen
  server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

myServer();
