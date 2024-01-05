import { useFlights } from "../hooks/useFlights";
import { useHotels } from "../hooks/useHotels";
import { useTravelPackage } from "../hooks/useTravelPackage";
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

  const { packages, handlerAddPackage, initialPackageForm } = useTravelPackage();

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
        handlerAddPackage,
      }}
    >
      {children}
    </CreatePackageContext.Provider>
  );
};
