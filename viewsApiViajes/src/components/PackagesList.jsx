import { useContext } from "react";
import { TravelPackageContext } from "../context/TravelPackageContext";
import { PackagesRow } from "./PackagesRow";

export const PackagesList = () => {
  const { packages } = useContext(TravelPackageContext);

  return (
    <div className="cards">
      {packages.map(({ id, name, hotel, flight, initDate, endDate, price }) => (
        <PackagesRow
          key={id}
          id={id}
          name={name}
          hotel={hotel}
          flight={flight}
          initDate={initDate}
          endDate={endDate}
          price={price}
        />
      ))}
    </div>
  );
};
