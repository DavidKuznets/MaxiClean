import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export const ContactsPage = () => {
  const [geoData, setGeoData] = useState<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null>(null);

  useEffect(() => {
    fetch("/path/to/kyiv_oblast.geojson")
      .then((res) => res.json())
      .then((data: FeatureCollection<Geometry, GeoJsonProperties>) => {
        setGeoData(data);
      })
      .catch((err) => {
        console.error("Failed to load geojson:", err);
      });
  }, []);

  const style = () => ({
    fillColor: "rgba(255, 0, 0, 0.6)", // яскраво червоний
    color: "darkred", // обводка темно червона
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
  });

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[50.45, 30.52]}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && <GeoJSON data={geoData} style={style} />}
      </MapContainer>
    </div>
  );
};
