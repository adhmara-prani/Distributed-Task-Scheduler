import express from "express";
import {
  requestRides,
  getRide,
  acceptedRide,
} from "../controllers/rides.controller.js";

const router = express.Router();

// ride selection router
router.get("/:id", getRide);

// request ride router
router.post("/", requestRides);

// rider assigned router
router.post("/:id/accept", acceptedRide);

export default router;
