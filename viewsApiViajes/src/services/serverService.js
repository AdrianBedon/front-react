import axios from "axios";

const BASE_URL = "https://corebackend.onrender.com/api/v1/servidor";

const config = () => {
  return {
    headers: {
      Authorization: sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
};

export const findAll = async () => {
  try {
    const response = await axios.get(BASE_URL, config());
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};
