import { useReducer } from "react";
import { hotelsReducer } from "../reducers/hotelsReducer";
import { findAll, findCity } from "../services/hotelService";

const initialHotels = [];

export const useHotels = () => {
  const [hotels, dispatch] = useReducer(hotelsReducer, initialHotels);

  const getHotels = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingHotels",
      payload: result.data,
    });
  };

  const filterHotels = async (city) => {
    let result;
    if (city === "All") {
      result = await findAll();
    } else {
      result = await findCity(city);
    }
    console.log(result);
    dispatch({
      type: city !== "All" ? "filterHotels" : "loadingHotels",
      payload: result.data,
    });
  };

  return {
    hotels,
    getHotels,
    filterHotels,
  };
};
