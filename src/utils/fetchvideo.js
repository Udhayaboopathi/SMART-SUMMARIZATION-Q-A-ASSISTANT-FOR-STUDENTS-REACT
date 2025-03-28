import axios from "axios";

export const fetchSummary = async (endpoint, data, isFile = false) => {
  try {
    const formData = new FormData();

    if (isFile) {
      formData.append("file", data); // Add the file to the FormData object
    } else {
      formData.append("link", data); // If sending a YouTube link or similar
    }

    const response = await axios.post(
      `http://13.201.72.203:8000/${endpoint}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
};
