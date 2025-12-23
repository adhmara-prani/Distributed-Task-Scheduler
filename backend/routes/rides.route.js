import express from "express";
import {
  requestRides,
  getRide,
  acceptedRide,
  getAvailableRides,
} from "../controllers/rides.controller.js";

const router = express.Router();

// ride selection router
router.get("/:id", getRide);

// request ride router
router.post("/", requestRides);

// rider assigned router
router.post("/:id/accept", acceptedRide);

// all available rides
router.get("/available", getAvailableRides);

export default router;
