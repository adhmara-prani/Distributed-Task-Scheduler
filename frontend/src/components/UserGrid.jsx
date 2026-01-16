import React from "react";
import { ActivityGraph } from "./ActivityGraph.jsx";
import { RideRequestForm } from "./RideRequestForm.jsx";

export const UserGrid = ({
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <RideRequestForm
        pickup={pickup}
        setPickup={setPickup}
        dropoff={dropoff}
        setDropoff={setDropoff}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />

      <ActivityGraph />
    </div>
  );
};
