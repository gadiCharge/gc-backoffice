import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Building, Plug, Settings, Fuel, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-3 fixed top-4 left-4 bg-gray-900 text-white rounded-lg z-50"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Background Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar} // Clicking outside the sidebar closes it
        ></div>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed md:relative w-64 bg-gray-900 text-white h-screen p-5 transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">GadiCharge</h2>
          {/* Close Button (Mobile Only) */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white p-2"
            aria-label="Close Sidebar"
          >
            <X />
          </button>
        </div>

        {/* Navigation Links */}
        <nav>
          {[
            { path: "/companies", label: "Companies", icon: <Building className="mr-2" /> },
            { path: "/charging-stations", label: "Charging Stations", icon: <Fuel className="mr-2" /> },
            { path: "/charge-points", label: "Charge Points", icon: <Plug className="mr-2" /> },
            { path: "/operation-modes", label: "Operation Modes", icon: <Settings className="mr-2" /> },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)} // Auto-close on mobile click
              className="flex items-center p-3 rounded hover:bg-gray-700 transition duration-200"
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
