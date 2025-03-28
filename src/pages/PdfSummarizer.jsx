import React, { useState } from "react";
import { fetchSummary } from "../utils/fetchData";
import { motion } from "framer-motion";
import Magnet from "../blocks/Animations/Magnet/Magnet";
import TrueFocus from "../blocks/TextAnimations/TrueFocus/TrueFocus";
import BottomNavBar from "../components/BottomNavBar";
import ContentDisplay from "../components/ContentDisplay";
const PdfSummarizer = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetchSummary("analyze/pdf", file);
      console.log("API Response:", response);

      if (!response || !response.summary) {
        setError("No summary found in API response.");
        return;
      }

      setSummary(response);
    } catch (err) {
      setError("Error processing file. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const getSummarySection = (sectionKey, sectionName) => {
    const section = summary?.summary?.[sectionKey];
    return section && section.length > 0 ? (
      section.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {typeof item === "string" ? item : JSON.stringify(item)}
        </motion.li>
      ))
    ) : (
      <p>No {sectionName} available.</p>
    );
  };

  const getTechnicalTerms = () => {
    const terms = summary?.summary?.technical_terms;
    return terms && Object.keys(terms).length > 0 ? (
      Object.entries(terms).map(([term, definition], index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <p className="font-semibold">{term}:</p>
          <p className="text-gray-700">{definition}</p>
        </motion.div>
      ))
    ) : (
      <p>No technical terms available.</p>
    );
  };

  return (
    <>
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <div className="max-w-3xl mx-auto p-6  rounded-lg  pb-50">
          {/* Animated Title */}
          <div className="text-3xl font-bold text-center text-blue-600 mb-8">
            <TrueFocus
              sentence="PDF Summarizer"
              manualMode={false}
              blurAmount={5}
              borderColor="black"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.h1>

          {/* File Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <motion.label
              className="w-full px-4 py-3 border rounded-lg cursor-pointer bg-white shadow-md hover:bg-gray-200 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="text-gray-700 font-semibold">
                {file ? file.name : "Choose a PDF File"}
              </span>
            </motion.label>

            <Magnet padding={50} disabled={false} magnetStrength={50}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md disabled:bg-gray-400 transition"
              >
                {loading ? "Processing..." : "Summarize PDF"}
              </motion.button>
            </Magnet>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              className="text-red-600 font-semibold mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          {summary && <ContentDisplay summary={summary} />}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default PdfSummarizer;
