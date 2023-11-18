import axios from "axios";

export const loginUser = async ({ username, password }) => {
  try {
    return await axios.post("https://core-viajes.onrender.com/login", {
      username,
      password,
    });
  } catch (error) {
    throw error;
  }
};
