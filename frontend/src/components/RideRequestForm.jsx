import React from "react";

import { FiMapPin, FiNavigation, FiSearch } from "react-icons/fi";

export const RideRequestForm = ({
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  onSubmit,
  isLoading,
}) => {
  return (
    <div
      className="col-span-12 md:col-span-4"
      p-4
      rounded
      border
      border-stone-300
      bg-white
      h-fit
    >
      <div className="mb-6">
        <h3 className="flex items-center gap-2 font-bold text-lg text-stone-900">
          <FiNavigation className="text-violet-600">Book a Ride</FiNavigation>
        </h3>

        <p className="text-stone-500 text-sm">
          Enter your details here to find a driver nearby.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">
            Pickup Location
          </label>

          <div className="relative">
            <FiMapPin className="absolute top-2.5 left-2.5 text-stone-400">
              <input
                type="text"
                placeholder="e.g. Chandni Chowk, Hauz Khas, Azadpur"
                className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
            </FiMapPin>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">
            Dropoff Destination
          </label>

          <div className="relative">
            <FiSearch className="absolute top-2.5 left-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="e.g. Gurgaon, Pitampura, Rajouri Garden"
              className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white transition-colors
            ${
              isLoading
                ? "bg-violet-400 cursor-not-allowed"
                : "bg-stone-900 hover:bg-stone-700"
            }`}
        >
          {isLoading ? "Searching..." : "Find a Driver 🚗"}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-stone-200">
        <p className="text-xs text-stone-400 text-center">
          Prices may vary based on traffic and availability.
        </p>
      </div>
    </div>
  );
};
