import React from "react";
import { FiMapPin, FiNavigation } from "react-icons/fi";

export const AvailableRides = ({ rides, onAccept }) => {
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 overflow-x-scroll">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiNavigation /> Available Rides Area
        </h3>
        <span className="text-sm text-stone-500">
          {rides.length} rides nearby
        </span>
      </div>

      {rides.length === 0 ? (
        <div className="text-center py-10 text-stone-500 text-sm">
          No rides currently available. Waiting for updates...
        </div>
      ) : (
        <table className="w-full table-auto">
          <TableHead />
          <tbody>
            {rides.map((ride, index) => (
              <TableRow
                key={ride.id}
                ride={ride}
                order={index}
                onAccept={onAccept}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">ID</th>
        <th className="text-start p-1.5">Pickup Location</th>
        <th className="text-start p-1.5">Dropoff Location</th>
        <th className="text-start p-1.5">Est. Fare</th>
        <th className="w-8">Action</th>
      </tr>
    </thead>
  );
};

const TableRow = ({ ride, order, onAccept }) => {
  const mockFare = (Math.random() * (50 - 15) + 15).toFixed(2);

  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5 text-violet-600 font-medium">#{ride.id}</td>
      <td className="p-1.5">
        <div className="flex items-center gap-1">
          <FiMapPin className="text-stone-400 text-xs" /> {ride.pickup_location}
        </div>
      </td>
      <td className="p-1.5">{ride.dropoff_location}</td>
      <td className="p-1.5 font-semibold">${mockFare}</td>
      <td className="p-1.5">
        <button
          onClick={() => onAccept(ride.id)}
          className="bg-stone-900 hover:bg-stone-700 text-white text-xs px-3 py-1.5 rounded transition-colors whitespace-nowrap"
        >
          Accept Ride
        </button>
      </td>
    </tr>
  );
};
