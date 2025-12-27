import React from "react";
import { FiCalendar, FiLogOut } from "react-icons/fi";

export const TopBar = ({ driverId, onLogout }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-lg font-bold block">Driver Dashboard</span>
          <span className="text-sm block text-stone-500">ID: #{driverId}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block text-xs text-stone-500 font-medium">
            {currentDate}
          </div>
          <button
            onClick={onLogout}
            className="flex text-sm items-center gap-2 bg-red-100 transition-colors hover:bg-red-200 text-red-700 px-3 py-1.5 rounded"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
