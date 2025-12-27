import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";

export const Skeleton = ({ rides, onAccept, driverId, onLogout }) => {
  return (
    <div className="bg-white rounded-lg pb-2 pt-2 shadow h-full">
      <TopBar driverId={driverId} onLogout={onLogout} />
      <Grid rides={rides} onAccept={onAccept} />
    </div>
  );
};
