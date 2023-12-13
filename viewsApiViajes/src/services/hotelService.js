import axios from "axios";

const BASE_URL = "https://core-viajes.onrender.com/hotels";

/*const config = () => {
    return {
      headers: {
        "Authorization": sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
  };*/
export const findAll = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const findCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/${city}`);
    return response;
  } catch (error) {
    throw error;
  }
};
