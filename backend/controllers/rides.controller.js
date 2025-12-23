import pool from "../db/db.js";
import { publishRideRequest } from "../utils/kafka.util.js";

// request rides logic
export const requestRides = async (req, res) => {
  try {
    const { userId, pickup_location, destination } = req.body;
    if (!userId || !pickup_location || !destination) {
      return res.status(400).json({
        message: "Either user or location or destination is not defined!",
      });
    }

    const newRide = await pool.query(
      "INSERT INTO rides (user_id, status, pickup_location, dropoff_location) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, "SEARCHING", pickup_location, destination]
    );

    const latestRideData = newRide.rows[0];
    console.log(latestRideData);

    // KAFKA yaha aayega
    await publishRideRequest(latestRideData);

    res.status(200).json({
      message: "Request for new driver successful!",
      ride: latestRideData,
    });
  } catch (error) {
    console.log(error.stack);
    res
      .status(500)
      .json({ message: "Internal Server Error! Couldn't request your ride!" });
  }
};

// get ride status
export const getRide = async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await pool.query("SELECT * FROM rides WHERE id = $1", [id]);

    if (ride.rows.length === 0) {
      return res.status(400).json({ message: "Ride not found!" });
    }

    const rideData = ride.rows[0];
    console.log(rideData);

    res.status(200).json({ ride: rideData });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({
      message: "Internal Server Error! Couldn't fetch rides in the vicinity",
    });
  }
};

// driver accepts ride
export const acceptedRide = async (req, res) => {
  const { id } = req.params;
  const { driverId } = req.body;

  if (!driverId)
    return res.status(400).json({
      message: "DriverId is not defined!",
    });

  const client = await pool.connect();

  try {
    // begin transaction
    await client.query("BEGIN");

    // locking rows using transaction (FOR UPDATE)
    const rideRes = await client.query(
      "SELECT status FROM rides WHERE id = $1 FOR UPDATE",
      [id]
    );

    // error handling if no ride available
    if (rideRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Ride not found!" });
    }

    const ride = rideRes.rows[0];

    // concurrency handling
    if (ride.status !== "SEARCHING") {
      await client.query("ROLLBACK");
      return res.status(409).json({
        message:
          "Apologies driver, this ride has been accepted by another driver!",
      });
    }

    // console.log(
    //   `Driver ${driverId} has already accepted the ride. Sleeping for 5 sec...`,
    //   await new Promise((resolve) => setTimeout(resolve, 5000))
    // );

    // update the taken ride
    const updateRide = await client.query(
      "UPDATE rides SET driver_id = $1, status = 'ACCEPTED' WHERE id = $2 RETURNING *",
      [driverId, id]
    );

    // commit changes and release locking
    await client.query("COMMIT");

    const updateRideData = updateRide.rows[0];
    console.log("Ride accepted: ", updateRideData);

    res.status(200).json({
      message: "Driver assigned to your ride and will be arriving shortly!",
      ride: updateRideData,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error.stack);
    res.status(500).json({
      message: "Internal Server Error! Driver couldn't be assigned",
    });
  } finally {
    // RELEASE THE CLIENT TO THE POOL
    // so that application doesn't hang after exceeding pool request limit
    client.release();
  }
};

// get all available rides
export const getAvailableRides = async (req, res) => {
  try {
    const rides = await pool.query(
      "SELECT * FROM rides WHERE status = $1 ORDER BY created_at DESC",
      ["SEARCHING"]
    );

    res.status(200).json(rides.rows);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({
      message: "Error fetching the available rides! Please try again later!",
    });
  }
};

/* CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    driver_id INT,
    status VARCHAR(20) DEFAULT 'SEARCHING', -- SEARCHING, ACCEPTED, COMPLETED
    pickup_location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    dropoff_location VARCHAR(255)
); */
