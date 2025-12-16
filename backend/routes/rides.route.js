import express from "express";

const router = express.Router();

router.get("/:id", (req, res) => {
  console.log("This here is your selected ride!");
  res.send("Ride selected!");
});

router.post("/", (req, res) => {
  console.log("Rides available in your area!");
  res.send("Ride available!");
});

router.post("/:id/accept", (req, res) => {
  console.log("Driver assigned for your destination!");
  res.send("Driver assigned!");
});

export default router;
