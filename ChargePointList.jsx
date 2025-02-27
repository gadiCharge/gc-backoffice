import React, { useEffect, useState } from "react";
import axios from "axios";

const ChargePointList = () => {
  const [chargePoints, setChargePoints] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charge-points")
      .then((res) => setChargePoints(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Charge Points</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chargePoints.map((point) => (
          <div key={point.ChargePointID} className="p-4 bg-white shadow-lg rounded-xl">
            <h3 className="text-lg font-semibold">OEM: {point.OEM}</h3>
            <p className="text-gray-600">Type: {point.Type}</p>
            <p className="text-gray-600">Power: {point.PowerRating} kW</p>
            <p className="text-gray-600">Charge Station ID: {point.ChargeStationID}</p>
            <p className="text-gray-500 text-sm">Created On: {new Date(point.CreatedOn).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChargePointList;
