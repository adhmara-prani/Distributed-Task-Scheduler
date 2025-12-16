import pool from "../db/db.js";

// request rides logic
export const requestRides = async (req, res) => {
  try {
    const { userId, location } = req.body;
    if (!userId || !location) {
      return res
        .status(400)
        .json({ message: "Either user or location is not defined!" });
    }

    const newRide = await pool.query(
      "INSERT INTO rides (user_id, pickup_location) VALUES ($1, $2) RETURNING *",
      [userId, location]
    );

    // KAFKA yaha aayega

    const latestRideData = newRide.rows[0];
    console.log(latestRideData);

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
    res
      .status(500)
      .json({ message: "Internal Server Error! Couldn't fetch ride status!" });
  }
};

// driver accepts ride
export const acceptedRide = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;

    const updateRide = await pool.query(
      "UPDATE rides SET driver_id = $1, status = 'ACCEPTED' WHERE id = $2 RETURNING *",
      [driverId, id]
    );

    if (updateRide.rows.length === 0) {
      return res.status(400).json({ message: "Ride not found!" });
    }

    const updateRideData = updateRide.rows[0];
    console.log(updateRideData);
    res.status(200).json({
      message: "Driver assigned to your ride!",
      rides: updateRideData,
    });
  } catch (error) {
    console.log(error.stack);
    res
      .status(500)
      .json({ message: "Internal Server Error! Driver couldn't be assigned!" });
  }
};

/* CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    driver_id INT,
    status VARCHAR(20) DEFAULT 'SEARCHING', -- SEARCHING, ACCEPTED, COMPLETED
    pickup_location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); */
