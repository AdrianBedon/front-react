import { useContext, useEffect, useState } from "react";
import { CreatePackageContext } from "../context/CreatePackageContext";
import { AuthContext } from "../auth/context/AuthContext";
import { HotelsList } from "../components/HotelsList";
import { FlightsList } from "../components/FlightsList";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";

export const CreatePackagePage = () => {
  const {
    hotels,
    getHotels,
    filterHotels,
    flights,
    getFlights,
    filterFlights,
  } = useContext(CreatePackageContext);

  const { login } = useContext(AuthContext);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedHotelName, setSelectedHotelName] = useState("");

  useEffect(() => {
    const opt = [{ key: "", value: "Select a city..." }];

    (async () => {
      const { data } = await axios.get(
        "https://core-viajes.onrender.com/cities"
      );
      data.forEach((val) => {
        opt.push({
          key: val.id,
          value: val.name,
        });
      });
    })();

    setOptions(opt);
  }, []);

  useEffect(() => {
    getHotels();
  }, []);

  useEffect(() => {
    getFlights();
  }, []);

  const handleHotelSelect = (name) => {
    setSelectedHotelName(name);
    console.log(name);
  };

  return (
    <>
      <div className="container my-4">
        <h2>Crear Paquete de Viaje</h2>
        <div className="input-group mb-3">
          <button
            type="button"
            className="btn btn-sm btn-filter"
            onClick={() =>
              filterHotels(selectedOption) && filterFlights(selectedOption)
            }
          >
            Filtrar
          </button>
          <div className="form-floating">
            <select
              className="form-select"
              id="city"
              onChange={(event) =>
                event.target.value === "Select a city..."
                  ? setSelectedOption("All")
                  : setSelectedOption(event.target.value)
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
            <label for="city">Ciudad</label>
          </div>
        </div>
        <Tabs defaultActiveKey="hotel">
          <Tab eventKey="hotel" title="Hotel">
            <div className="card">
              <div className="row">
                <div className="col">
                  {hotels.length === 0 ? (
                    <div className="alert alert-warning">
                      No hay hoteles registrados en el sistema!
                    </div>
                  ) : (
                    <HotelsList />
                  )}
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="flight" title="Flight">
            <div className="card">
              <div className="row">
                <div className="col">
                  {flights.length === 0 ? (
                    <div className="alert alert-warning">
                      No hay vuelos registrados en el sistema!
                    </div>
                  ) : (
                    <FlightsList />
                  )}
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
