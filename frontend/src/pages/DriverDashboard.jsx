import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
// import { Sidebar } from "../components/Sidebar.jsx";
import { Skeleton } from "../components/Skeleton.jsx";

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);
  const driverId = localStorage.getItem("userId");
  const socket_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const socketRef = useRef();
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    if (socketRef.current) socketRef.current.disconnect();
    toast.info("Logged out successfully!");
    nav("/login");
  };

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
    socketRef.current = io(socket_URL);

    socketRef.current.on("new-ride-available", (newRide) => {
      setRides((prevRides) => {
        if (prevRides.find((ride) => ride.id === newRide.id)) return prevRides;
        toast.info("New Ride is available in your area!", {
          toastId: `new-ride-${newRide.id}`,
        });
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

      setRides((prevRides) => prevRides.filter((ride) => ride.id !== rideId));
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // from backend
        toast.error(`Too slow! This ride has been accepted by another driver!`);
        setRides((prevRides) => prevRides.filter((ride) => ride.id !== rideId));
      } else toast.error(`Error in accepting the ride!`);
    }
  };

  return (
    <div className="bg-stone-100 min-h-screen p-4">
      <Skeleton
        rides={rides}
        onAccept={handleAccept}
        driverId={driverId}
        onLogout={handleLogout}
      />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default DriverDashboard;
