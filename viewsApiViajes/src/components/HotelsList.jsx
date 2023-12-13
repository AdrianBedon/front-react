import { useContext } from "react";
import { HotelContext } from "../context/HotelContext";
import { HotelRow } from "./HotelRow";

export const HotelsList = () => {
  const { hotels } = useContext(HotelContext);

  return (
    <div className="cards">
      {hotels.map(({ id, name, city, price }) => (
        <HotelRow
          key={id}
          id={id}
          name={name}
          city={city}
          price={price}
        />
      ))}
    </div>
  );
};
