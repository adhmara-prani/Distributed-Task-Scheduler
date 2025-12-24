import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const userId = localStorage.getItem("userId");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleRequestRide = (e) => {
    e.preventDefault();
    // Logic to call API will go here
    toast.info(`Requesting ride from ${pickup} to ${dropoff}...`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          User Dashboard 🙋‍♂️
        </h1>
        <p className="mb-6 text-gray-600">Welcome, User #{userId}</p>

        <form onSubmit={handleRequestRide} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              type="text"
              placeholder="e.g. Central Park"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dropoff Destination
            </label>
            <input
              type="text"
              placeholder="e.g. Times Square"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Find a Driver 🚗
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default UserDashboard;
