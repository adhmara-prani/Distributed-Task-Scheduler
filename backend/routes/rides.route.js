import express from "express";
import {
  requestRides,
  getRide,
  acceptedRide,
  getAvailableRides,
} from "../controllers/rides.controller.js";

const router = express.Router();

// all available rides
router.get("/available", getAvailableRides);

// request ride router
router.post("/", requestRides);

// ride selection router
router.get("/:id", getRide);

// rider assigned router
router.post("/:id/accept", acceptedRide);

export default router;
