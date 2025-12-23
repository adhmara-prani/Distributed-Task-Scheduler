import { useRef, useEffect, useState } from "react";
import api from "../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);
  const driverId = localStorage.getItem("userId");

  const socketRef = useRef();

  const getRides = async () => {
    try {
      const res = await api.get("/rides/available");
      setRides(res.data);
    } catch (error) {
      console.log("Failed to get available rides!", error.stack);
    }
  };

  useEffect(() => {
    getRides();
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("new-ride-available", (newRide) => {
      setRides((prevRides) => {
        if (prevRides.find((ride) => ride.id === newRide.id)) return prevRides;
        toast.info("New Ride is available in your area!");
        return [newRide, ...prevRides];
      });
    });

    socketRef.current.on("ride-taken", (data) => {
      setRides((prevRides) =>
        prevRides.filter((ride) => ride.id !== data.rideId)
      );
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleAccept = async (rideId) => {
    try {
      const res = await api.post(`/rides/${rideId}/accept`, { driverId });
      toast.success(`Ride #${rideId} accepted successfully!`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // from backend
        toast.error(`Too slow! This ride has been accepted by another driver!`);
      } else toast.error(`Error in accepting the ride!`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Driver Dashboard 🚖</h1>
      <p>Welcome, Driver #{driverId}</p>

      <div style={{ marginTop: "20px" }}>
        <h3>Available Rides (Real-Time)</h3>
        {rides.length === 0 ? (
          <p>No rides available...</p>
        ) : (
          rides.map((ride) => (
            <div
              key={ride.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div>
                <strong>Ride #{ride.id}</strong>
                <br />
                <span>From: {ride.pickup_location}</span>
                <br />
                <span>To: {ride.dropoff_location}</span>
              </div>
              <button
                onClick={() => handleAccept(ride.id)}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ACCEPT RIDE
              </button>
            </div>
          ))
        )}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default DriverDashboard;
