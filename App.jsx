import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CompanyList from "./pages/CompanyList";
import ChargingStationList from "./pages/ChargingStationList";
import ChargePointList from "./pages/ChargePointList";
import OperationMode from "./pages/OperationMode";

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6">
          <Navbar />
          <Routes>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/charging-stations" element={<ChargingStationList />} />
            <Route path="/charge-points" element={<ChargePointList />} />
            <Route path="/operation-modes" element={<OperationMode />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
