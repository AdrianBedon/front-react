import { useHotels } from "../hooks/useHotels";
import { HotelContext } from "./HotelContext";

export const HotelProvider = ({ children }) => {
  const { hotels, getHotels, filterHotels } = useHotels();

  return (
    <HotelContext.Provider value={{ hotels, getHotels, filterHotels }}>
      {children}
    </HotelContext.Provider>
  );
};
