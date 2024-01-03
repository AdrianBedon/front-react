import { useContext } from "react";
import { CreatePackageContext } from "../context/CreatePackageContext";
import { FlightRow } from "./FlightRow";

export const FlightsList = () => {
  const { flights, flightSelected, handlerFlightSelected } =
    useContext(CreatePackageContext);

  return (
    <div class="row row-cols-1 row-cols-md-4 g-4">
      {flights.map(({ id, code, city_departure, city_arrival, price }) => (
        <FlightRow
          key={id}
          id={id}
          code={code}
          city_departure={city_departure}
          city_arrival={city_arrival}
          price={price}
          flightSelected={flightSelected}
          onClick={() =>
            handlerFlightSelected({
              id,
              code,
              city_departure,
              city_arrival,
              price,
            })
          }
        />
      ))}
    </div>
  );
};
