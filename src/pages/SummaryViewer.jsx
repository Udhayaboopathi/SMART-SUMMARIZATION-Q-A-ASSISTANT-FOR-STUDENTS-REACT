import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentDisplay from "../components/ContentDisplay"; // Ensure this is correctly imported

const SummaryView = () => {
  const [summaries, setSummaries] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get_history");
        console.log("API Response:", response.data);
        setSummaries(response.data);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };

    fetchSummaries();
  }, []);

  const handleSelection = (event) => {
    const selectedId = event.target.value;
    const summary = summaries.find((item) => item._id === selectedId);
    setSelectedSummary(summary);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Summary Viewer</h2>

      {/* Dropdown Selection */}
      <label className="block text-lg font-bold mb-2">Select a Title:</label>
      <select
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        onChange={handleSelection}
        defaultValue=""
      >
        <option value="" disabled>
          -- Select a title --
        </option>
        {summaries.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title || "Untitled"}
          </option>
        ))}
      </select>

      {/* Display Selected Summary */}
      {selectedSummary && <ContentDisplay summary={selectedSummary} />}
    </div>
  );
};

export default SummaryView;
