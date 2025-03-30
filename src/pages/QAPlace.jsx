import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Magnet from "../blocks/Animations/Magnet/Magnet";
import TrueFocus from "../blocks/TextAnimations/TrueFocus/TrueFocus";
import BottomNavBar from "../components/BottomNavBar";

const AskQuestion = () => {
  const [question, setQuestion] = useState("");
  const [id, setId] = useState(""); // The selected title ID
  const [titles, setTitles] = useState([]); // Store all titles
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch titles when the component mounts
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("http://13.201.72.203:8000/get_summaries");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched titles:", data); // Check the structure of fetched data
          setTitles(data); // Assuming data is an array of titles or objects with `id` and `title`
        } else {
          setError("Failed to fetch titles.");
        }
      } catch (error) {
        setError("Error: Could not fetch titles.");
      }
    };

    fetchTitles();
  }, []);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    if (!id.trim()) {
      setError("Please select a valid title.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error message
    setAnswer(null); // Reset previous answer

    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("id", id);

      const response = await fetch("http://13.201.72.203:8000/ask_question", {
        method: "POST",
        body: formData, // Sending data as FormData
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched answer:", data); // Debugging line to check the fetched data

        // Set the answer object, assuming response contains dynamic keys
        setAnswer(data);
      } else {
        setError("Error fetching the answer.");
      }
    } catch (error) {
      setError("Error: Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  // Recursive rendering for dynamic and nested structures in the answer
  const renderContent = (data) => {
    if (typeof data !== "object" || data === null) {
      // If data is not an object, just render it as text
      return <p className="mt-2">{data}</p>;
    }

    return Object.keys(data).map((key, index) => {
      const value = data[key];

      return (
        <div key={index} style={{ marginLeft: "20px" }}>
          <h3 className="font-semibold text-xl mt-4">
            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
          </h3>
          {typeof value === "object" ? (
            <div>{renderContent(value)}</div> // Recursively render nested object
          ) : (
            <p className="ml-4">{value}</p> // Add a left margin for nested values
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <div className="max-w-3xl mx-auto p-6 rounded-lg pb-50">
          {/* Animated Title */}
          <div className="text-3xl font-bold text-center text-blue-600 mb-8">
            <TrueFocus
              sentence="Ask a Question"
              manualMode={false}
              blurAmount={5}
              borderColor="black"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>

          {/* Dropdown to select title */}
          <div className="mb-4">
            <select
              value={id}
              onChange={(e) => setId(e.target.value)}
              className=" bg-white mt-2 p-2 border rounded w-full"
            >
              <option value="">Select a Title</option>
              {titles && titles.length > 0 ? (
                titles.map((title, index) => (
                  <option key={index} value={title.id}>
                    {title.title.toUpperCase()}{" "}
                    {/* Convert title to upperc ase */}
                  </option>
                ))
              ) : (
                <option disabled>No titles available</option>
              )}
            </select>
          </div>

          {/* Input for question */}
          <div className="mb-4">
            <motion.input
              type="text"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-white mt-2 p-2 border rounded w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Submit button */}
          <Magnet padding={50} disabled={false} magnetStrength={50}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAskQuestion}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
            >
              {loading ? "Loading..." : "Ask"}
            </motion.button>
          </Magnet>

          {/* Display errors */}
          {error && (
            <motion.p
              className="mt-4 text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          {/* Display the answer */}
          {answer && !loading && (
            <motion.div
              className="bg-white mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Render the dynamic content */}
              <div className="mt-4 pt-4">
                <div className="prose">{renderContent(answer)}</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
