import React from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { UsageRadar } from "./UsageRadar";
import { AvailableRides } from "./AvailableRides";

export const Grid = ({ rides, onAccept }) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards />
      <ActivityGraph />
      <UsageRadar />
      <AvailableRides rides={rides} onAccept={onAccept} />
    </div>
  );
};
