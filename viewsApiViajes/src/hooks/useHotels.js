import { useReducer, useState } from "react";
import { hotelsReducer } from "../reducers/hotelsReducer";
import { findAll, findCity } from "../services/hotelService";

const initialHotels = [];

const initialHotelForm = {
  id: 0,
  name: "",
  city: "",
  price: 0,
};

export const useHotels = () => {
  const [hotels, dispatch] = useReducer(hotelsReducer, initialHotels);
  const [hotelSelected, setHotelSelected] = useState(initialHotelForm);

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
    setHotelSelected(initialHotelForm);
  };

  const handlerHotelSelected = (hotel) => {
    setHotelSelected({ ...hotel });
  };

  return {
    hotelSelected,
    hotels,
    getHotels,
    filterHotels,
    handlerHotelSelected,
  };
};
