import { useContext, useEffect, useState } from "react";
import { HotelContext } from "../context/HotelContext";
import { AuthContext } from "../auth/context/AuthContext";
import { HotelsList } from "../components/HotelsList";
import axios from "axios";

export const HotelsPage = () => {
  const { hotels, getHotels, filterHotels } = useContext(HotelContext);

  const { login } = useContext(AuthContext);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(""); 

  useEffect(() => {
    const opt = [{ key: "", value: "Select a city..." }];

    (async () => {
      const { data } = await axios.get("https://core-viajes.onrender.com/cities");
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
  return (
    <>
      <div className="container my-4">
        <h2>Hotels</h2>
        <div className="form-floating">
          <select className="form-select" id="city" onChange={event => event.target.value === "Select a city..." ? setSelectedOption("All") : setSelectedOption(event.target.value)}>
            {options.map((option) => {
              return (
                <option key={option.key} value={option.value} >{option.value}</option>
              )
            })}
          </select>
          <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => filterHotels(selectedOption)}
            >Filtrar</button>
          <label for="city">Ciudad</label>
        </div>
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
    </>
  );
};
