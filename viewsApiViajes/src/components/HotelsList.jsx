import { useContext } from "react";
import { CreatePackageContext } from "../context/CreatePackageContext";
import { HotelRow } from "./HotelRow";

export const HotelsList = () => {
  const { hotels, hotelSelected, handlerHotelSelected } = useContext(CreatePackageContext);

  return (
    <div class="row row-cols-1 row-cols-md-4 g-4">
      {hotels.map(({ id, name, city, price }) => (
        <HotelRow
          key={id}
          id={id}
          name={name}
          city={city}
          price={price}
          hotelSelected = {hotelSelected}
          onClick={() =>
            handlerHotelSelected({
              id,
              name,
              city,
              price,
            })
          }
        />
      ))}
    </div>
  );
};
