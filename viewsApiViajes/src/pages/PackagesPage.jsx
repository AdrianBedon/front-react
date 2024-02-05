import { useContext, useEffect, useState } from "react";
import { PackagesList } from "../components/PackagesList";
import { TravelPackageContext } from "../context/TravelPackageContext";
import axios from "axios";

export const PackagesPage = () => {
  const [options, setOptions] = useState([]);
  const [filter, setFilter] = useState("");
  const [date_filter, setDate_filter] = useState("");
  const [init_price, setInitPrice] = useState("");
  const [final_price, setFinalPrice] = useState("");
  const [city, setCity] = useState("");

  const {
    packages,
    getPackages,
    getPackagesByDate,
    getPackagesByPrice,
    getPackagesByCity,
  } = useContext(TravelPackageContext);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await axios.get(
          "https://core-viajes.onrender.com/cities"
        );

        const opt = [{ key: "", value: "Select a city..." }];

        data.forEach((val) => {
          opt.push({
            key: val.id,
            value: val.name,
          });
        });

        setOptions(opt);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    getPackages();
  }, []);

  const onOptionChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="form__filters">
            <div className="radio__inputs">
              <label className="radio">
                <input
                  type="radio"
                  value="date"
                  id="date"
                  checked={filter === "date"}
                  onChange={onOptionChange}
                ></input>
                <span className="radio__name">Fecha</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  value="price"
                  id="price"
                  checked={filter === "price"}
                  onChange={onOptionChange}
                />
                <span className="radio__name">Precio</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  value="city"
                  id="city"
                  checked={filter === "city"}
                  onChange={onOptionChange}
                />
                <span className="radio__name">Ciudad</span>
              </label>
            </div>
          </div>
          <div className="filters">
            {filter === "date" && (
              <>
                <div className="input__container">
                  <input
                    className="input__field"
                    type="text"
                    id="date_filter"
                    value={date_filter}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    placeholder="Fecha del paquete"
                    onChange={(event) => setDate_filter(event.target.value)}
                  ></input>
                  <label className="input__label" htmlFor="date_filter">
                    Fecha del paquete
                  </label>
                  <span className="input__highlight"></span>
                </div>
                <div className="button__container">
                  <button
                    className="button"
                    type="button"
                    onClick={() => getPackagesByDate(date_filter)}
                  >
                    <span className="button__content">Buscar</span>
                  </button>
                </div>
              </>
            )}
            {filter === "price" && (
              <>
                <div className="row">
                  <div className="col">
                    <div className="input__container">
                      <input
                        className="input__field"
                        type="number"
                        id="initial_price"
                        value={init_price}
                        placeholder="Precio Inicial"
                        onChange={(event) => setInitPrice(event.target.value)}
                      />
                      <label className="input__label" htmlFor="initial_price">
                        Precio Inicial
                      </label>
                      <span className="input__highlight"></span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="input__container">
                      <input
                        className="input__field"
                        type="number"
                        id="final_price"
                        value={final_price}
                        placeholder="Precio Final"
                        onChange={(event) => setFinalPrice(event.target.value)}
                      />
                      <label className="input__label" htmlFor="final_price">
                        Precio Final
                      </label>
                      <span className="input__highlight"></span>
                    </div>
                  </div>
                </div>
                <div className="button__container">
                  <button
                    className="button"
                    type="button"
                    onClick={() => getPackagesByPrice(init_price, final_price)}
                  >
                    <span className="button__content">Buscar</span>
                  </button>
                </div>
              </>
            )}
            {filter === "city" && (
              <>
                <div className="input__container">
                  <select
                    className="input__field"
                    id="city"
                    onChange={(event) =>
                      event.target.value === "Select a city..."
                        ? setCity("All")
                        : setCity(event.target.value)
                    }
                  >
                    {options.map((option) => {
                      return (
                        <option key={option.key} value={option.value}>
                          {option.value}
                        </option>
                      );
                    })}
                  </select>
                  <label className="input__label" htmlFor="city">
                    Ciudad
                  </label>
                  <span className="input__highlight"></span>
                </div>
                <div className="button__container">
                  <button
                    className="button"
                    type="button"
                    onClick={() => getPackagesByCity(city)}
                  >
                    <span className="button__content">Buscar</span>
                  </button>
                </div>
              </>
            )}
          </div>
          {packages.length === 0 ? (
            <div className="alert alert-warning">
              No hay paquetes registrados en el sistema!
            </div>
          ) : (
            <PackagesList />
          )}
        </div>
      </div>
    </div>
  );
};
