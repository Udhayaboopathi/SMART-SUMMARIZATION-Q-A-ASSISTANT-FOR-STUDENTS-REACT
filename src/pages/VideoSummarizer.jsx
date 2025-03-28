import React, { useState } from "react";
import { fetchSummary } from "../utils/fetchvideo";
import { motion } from "framer-motion";
import Magnet from "../blocks/Animations/Magnet/Magnet";
import ContentDisplay from "../components/ContentDisplay";
import TrueFocus from "../blocks/TextAnimations/TrueFocus/TrueFocus";
import BottomNavBar from "../components/BottomNavBar";

const VideoSummarizer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleFetchSummary = async () => {
    if (!videoUrl) {
      alert("Please provide a video URL!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetchSummary("analyze/youtube", videoUrl);
      console.log("API Response:", response);

      if (!response || !response.summary) {
        setError("No summary found in API response.");
        return;
      }

      setSummary(response);
    } catch (err) {
      setError("Error processing video URL. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <div className="max-w-3xl mx-auto p-6 rounded-lg pb-50">
          {/* Animated Title */}
          <div className="text-3xl font-bold text-center text-blue-600 mb-8">
            <TrueFocus
              sentence="Video Summarizer"
              manualMode={false}
              blurAmount={5}
              borderColor="black"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>

          {/* Video URL Section */}
          <div className="flex flex-col items-center space-y-4">
            <motion.input
              type="text"
              placeholder="Enter video URL"
              value={videoUrl}
              onChange={handleUrlChange}
              className="w-full bg-white px-4 py-3 border rounded-lg focus:outline-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />

            <Magnet padding={50} disabled={false} magnetStrength={50}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFetchSummary}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md disabled:bg-gray-400 transition"
              >
                {loading ? "Processing..." : "Summarize Video"}
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

          {/* Display Summary Content */}
          {summary && <ContentDisplay summary={summary} />}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default VideoSummarizer;
