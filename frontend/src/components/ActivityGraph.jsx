import React from "react";
import { FiMapPin } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const ActivityGraph = () => {
  const position = [28.6139, 77.209]; // New Delhi

  return (
    <div className="col-span-12 lg:col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4 border-b border-stone-200 bg-white flex justify-between items-center">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiMapPin /> Live Map
        </h3>
        <span className="text-xs text-stone-500">Real-time GPS</span>
      </div>

      <div className="h-64 md:h-96 w-full z-0">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>You are here.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
