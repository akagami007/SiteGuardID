"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon missing issue in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ position, setPosition, readOnly }: { position: [number, number], setPosition: (pos: [number, number]) => void, readOnly?: boolean }) {
  useMapEvents({
    click(e) {
      if (!readOnly) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return position ? <Marker position={position} icon={icon} /> : null;
}

export default function MapPicker({ 
  initialLat, 
  initialLng, 
  onChange,
  readOnly = false
}: { 
  initialLat: number, 
  initialLng: number, 
  onChange?: (lat: number, lng: number) => void,
  readOnly?: boolean
}) {
  const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);

  // Sync position changes back to parent
  useEffect(() => {
    if (onChange && !readOnly) {
      onChange(position[0], position[1]);
    }
  }, [position]);

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-300 relative z-0">
      <MapContainer 
        center={position} 
        zoom={14} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={!readOnly}
        dragging={!readOnly}
        scrollWheelZoom={!readOnly}
        doubleClickZoom={!readOnly}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} readOnly={readOnly} />
      </MapContainer>
      {!readOnly && (
        <div className="absolute top-2 right-2 bg-white px-3 py-1 text-xs font-semibold text-slate-700 rounded-md shadow-sm z-[1000] border border-slate-200 pointer-events-none">
          Klik di mana saja untuk memindah pin
        </div>
      )}
    </div>
  );
}
