import axios from "axios";

export const getGeoInfo = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return response.data;
  } catch (error) {
    console.error("Error fetching geo info:", error);
    return null;
  }
};
