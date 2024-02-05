import { useTravelPackage } from "../hooks/useTravelPackage";
import { TravelPackageContext } from "./TravelPackageContext";
export const TravelPackageProvider = ({ children }) => {
  const {
    packages,
    getPackages,
    getPackagesByDate,
    getPackagesByPrice,
    getPackagesByCity,
  } = useTravelPackage();

  return (
    <TravelPackageContext.Provider
      value={{
        packages,
        getPackages,
        getPackagesByDate,
        getPackagesByPrice,
        getPackagesByCity,
      }}
    >
      {children}
    </TravelPackageContext.Provider>
  );
};
