import React, { useEffect, useState } from "react";
import axios from "axios";

const ChargingStationList = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charging-stations")
      .then((res) => setStations(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Charging Stations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station) => (
          <div key={`${station.ChargingStationID}-${station.StationName}`} className="p-4 bg-white shadow-lg rounded-xl">
            <h3 className="text-lg font-semibold">{station.StationName}</h3>
            <p className="text-gray-600">{station.Address}</p>
            <p className="text-gray-600">District: {station.District}</p>
            <p className="text-gray-600">Province: {station.Province}</p>
            <p className="text-gray-600">Chargers: {station.NumberOfChargers}</p>
            <p className="text-gray-500 text-sm">Created: {new Date(station.CreatedDate).toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Updated: {new Date(station.UpdatedDate).toLocaleString()}</p>
            <p className="text-gray-600">Company Code: {station.CompanyCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChargingStationList;
