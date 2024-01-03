import { useFlights } from "../hooks/useFlights";
import { useHotels } from "../hooks/useHotels";
import { CreatePackageContext } from "./CreatePackageContext";

export const CreatePackageProvider = ({ children }) => {
  const {
    hotels,
    hotelSelected,
    getHotels,
    filterHotels,
    handlerHotelSelected,
  } = useHotels();
  const {
    flights,
    flightSelected,
    getFlights,
    filterFlights,
    handlerFlightSelected,
  } = useFlights();

  return (
    <CreatePackageContext.Provider
      value={{
        hotels,
        hotelSelected,
        getHotels,
        filterHotels,
        handlerHotelSelected,
        flights,
        flightSelected,
        getFlights,
        filterFlights,
        handlerFlightSelected,
      }}
    >
      {children}
    </CreatePackageContext.Provider>
  );
};
