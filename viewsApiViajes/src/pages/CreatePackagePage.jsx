import { useContext, useEffect, useState } from "react";
import { CreatePackageContext } from "../context/CreatePackageContext";
import { AuthContext } from "../auth/context/AuthContext";
import { HotelsList } from "../components/HotelsList";
import { FlightsList } from "../components/FlightsList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";

export const CreatePackagePage = () => {
  const {
    hotels,
    hotelSelected,
    getHotels,
    filterHotels,
    flights,
    flightSelected,
    getFlights,
    filterFlights,
    handlerAddPackage,
    initialPackageForm,
  } = useContext(CreatePackageContext);

  const { login } = useContext(AuthContext);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [endingDate, setEndingDate] = useState(new Date());
  const [initialDate, setInitialDate] = useState(new Date());
  const [amountSelected, setAamountSelected] = useState(0);
  const [priceP, setPriceP] = useState(0);
  const [priceDifference, setPriceDifference] = useState(0);
  const [namePackage, setNamePackage] = useState("");
  const [packageForm, setPackageForm] = useState(initialPackageForm);

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

  const onSubmit = (event) => {
    event.preventDefault();

    const { name, initDate, endDate, hotel, flight, price, username, amount } =
      packageForm || {};

    const newPackageForm = {
      id: 0,
      name: namePackage,
      initDate: initialDate,
      endDate: endingDate,
      hotel: hotelSelected.name,
      flight: flightSelected.code,
      price: priceP,
      username: login.user.user.username,
      amount: amountSelected,
    };

    setPackageForm(newPackageForm);
    handlerAddPackage(packageForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="container my-4">
        <h2>Crear Paquete de Viaje</h2>
        <div className="input-group mb-3">
          <span className="input-group-text">Nombre del paquete</span>
          <div className="form-floating">
            <input
              className="form-control"
              id="name-package"
              placeholder="Ingrese un nombre para el paquete"
              onChange={(event) => setNamePackage(event.target.value)}
            ></input>
            <label for="name-package">Paquete</label>
          </div>
        </div>
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
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Fecha de Inicio</span>
              <DatePicker
                type="date"
                name="fechaInicio"
                id="fechaInicio"
                selected={initialDate || ""}
                className="form-control"
                onChange={(date) => setInitialDate(date)}
                dateFormat={"yyyy-MM-dd"}
              ></DatePicker>
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Fecha de Retorno</span>
              <DatePicker
                type="date"
                name="fechaRetorno"
                id="fechaRetono"
                selected={endingDate || ""}
                className="form-control"
                onChange={(date) => setEndingDate(date)}
                dateFormat={"yyyy-MM-dd"}
              ></DatePicker>
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Número de paquetes</span>
              <input
                id="nPaquetes"
                type="number"
                className="form-control"
                placeholder="0"
                min="0"
                onChange={(event) => setAamountSelected(event.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <Tabs defaultActiveKey="hotel">
          <Tab eventKey="hotel" title="Hotel">
            <p></p>
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
            <p></p>
          </Tab>
          <Tab eventKey="flight" title="Flight">
            <p></p>
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
            <p></p>
          </Tab>
        </Tabs>
        {hotelSelected.id !== 0 &&
        flightSelected.id !== 0 &&
        priceDifference !== 0 ? (
          <p>
            Puedes encontrar el paquete a ${priceDifference} entre Mayo y
            Octubre
          </p>
        ) : (
          <p></p>
        )}
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-create"
              onClick={() => {
                let newPriceDifference;
                let newPriceP;
                if (initialDate <= new Date(2024, 4, 1)) {
                  newPriceDifference =
                    1.15 * (hotelSelected.price + flightSelected.price) -
                    (hotelSelected.price +
                      flightSelected.price -
                      0.15 * (hotelSelected.price + flightSelected.price));

                  newPriceP =
                    1.15 * (hotelSelected.price + flightSelected.price);
                } else {
                  newPriceDifference = 0;
                  newPriceP =
                    hotelSelected.price +
                    flightSelected.price -
                    0.15 * (hotelSelected.price + flightSelected.price);
                }

                setPriceDifference(newPriceDifference);
                setPriceP(newPriceP);
              }}
            >
              Estimar Precio
            </button>
          </div>
          <div className="col">
            <div className="input-group">
              <span className="input-group-text">Precio del Paquete</span>
              <input
                className="form-control"
                type="number"
                value={priceP}
                disabled
              ></input>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-create float-end">
              Crear Paquete
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
