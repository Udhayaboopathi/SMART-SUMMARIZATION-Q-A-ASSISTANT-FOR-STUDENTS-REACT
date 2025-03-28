import axios from "axios";

// Function to fetch the summary from the backend
export const fetchSummary = async (endpoint, data, isFile = true) => {
  try {
    const formData = new FormData();

    if (isFile) {
      formData.append("file", data); // Add the file for upload
    } else {
      formData.append("link", data); // For YouTube link if needed
    }

    const response = await axios.post(
      `http://13.201.72.203:8000/${endpoint}`,
      formData
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error; // Rethrow error for handling in the calling component
  }
};
