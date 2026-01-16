import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/TopBar.jsx";
import { UserGrid } from "../components/UserGrid.jsx";
import api from "../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const userId = localStorage.getItem("userId");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };

  const handleRequestRide = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User Id missing! Please try to login again!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/rides", {
        userId: userId,
        pickup_location: pickup,
        destination: dropoff,
      });

      console.log("Ride requested: ", response.data);

      toast.success("Ride requested successfully!");

      setPickup("");
      setDropoff("");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to request ride. Try again.");
      }
    } finally {
      setIsLoading(false);
    }

    toast.info(`Requesting ride from ${pickup} to ${dropoff}...`);
  };

  return (
    <div className="bg-stone-100 min-h-screen p-4">
      <div className="bg-white rounded-lg pb-4 shadow h-full max-w-7xl mx-auto">
        <TopBar
          driverId={userId}
          onLogout={handleLogout}
          title="User Dashboard"
        />

        <UserGrid
          pickup={pickup}
          setPickup={setPickup}
          dropoff={dropoff}
          setDropoff={setDropoff}
          onSubmit={handleRequestRide}
          isLoading={isLoading}
        />
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default UserDashboard;
