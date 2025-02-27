import React, { useState, useEffect } from "react";
import axios from "axios";

const OperationMode = () => {
  const [operationModes, setOperationModes] = useState([]);
  const [newMode, setNewMode] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchOperationModes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/operation-modes");
        setOperationModes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching operation modes", error);
        setLoading(false);
      }
    };
    fetchOperationModes();
  }, []);

  const handleAddMode = async () => {
    if (!newMode) return;
    try {
      const response = await axios.post("http://localhost:5000/api/operation-modes", { mode: newMode });
      setOperationModes([...operationModes, response.data]);
      setNewMode("");
    } catch (error) {
      console.error("Error adding operation mode", error);
    }
  };

  const handleEditMode = (id, mode) => {
    setNewMode(mode);
    setEditMode(true);
    setEditId(id);
  };

  const handleUpdateMode = async () => {
    if (!newMode || editId === null) return;
  
    console.log("Updating mode with ID:", editId, "New Mode:", newMode); // Debugging
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/operation-modes/${editId}`,
        { mode: newMode }
      );
  
      console.log("Update Success:", response.data); // Debugging
  
      setOperationModes(operationModes.map((m) =>
        m.id === editId ? { ...m, mode: newMode } : m
      ));
      
      setNewMode("");
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating operation mode", error.response?.data || error);
    }
  };
  
  const handleRemoveMode = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/operation-modes/${id}`);
      setOperationModes(operationModes.filter((mode) => mode.id !== id));
    } catch (error) {
      console.error("Error removing operation mode", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 space-y-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center text-gray-800">Operation Modes</h1>

      <div className="flex flex-col sm:flex-row sm:space-x-4 items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
        <input
          type="text"
          value={newMode}
          onChange={(e) => setNewMode(e.target.value)}
          placeholder="New Operation Mode"
          className="input input-bordered w-full sm:w-64 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {editMode ? (
          <button
            onClick={handleUpdateMode}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Update Mode
          </button>
        ) : (
          <button
            onClick={handleAddMode}
            className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Add Mode
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {operationModes.map((mode) => (
            <li
              key={mode.id}
              className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all"
            >
              <span className="text-gray-700 text-lg font-medium">{mode.mode}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditMode(mode.id, mode.mode)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveMode(mode.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OperationMode;
