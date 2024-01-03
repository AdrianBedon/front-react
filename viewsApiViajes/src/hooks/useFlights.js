import { useReducer, useState } from "react";
import { flightsReducer } from "../reducers/flightsReducer";
import { findAll, findCity } from "../services/flightService";

const initialFlights = [];

const initialFlightForm = {
  id: 0,
  code: "",
  airline: "",
  city_departure: "",
  city_arrival: "",
  price: 0,
};

export const useFlights = () => {
  const [flights, dispatch] = useReducer(flightsReducer, initialFlights);
  const [flightSelected, setFlightSelected] = useState(initialFlightForm);

  const getFlights = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingFlights",
      payload: result.data,
    });
  };

  const filterFlights = async (city) => {
    let result;
    if (city === "All") {
      result = await findAll();
    } else {
      result = await findCity(city);
    }
    console.log(result);
    dispatch({
      type: city !== "All" ? "filterFlights" : "loadingFlights",
      payload: result.data,
    });
    setFlightSelected(initialFlightForm);
  };

  const handlerFlightSelected = (flight) => {
    setFlightSelected({ ...flight });
  };

  return {
    flights,
    flightSelected,
    getFlights,
    filterFlights,
    handlerFlightSelected,
  };
};
