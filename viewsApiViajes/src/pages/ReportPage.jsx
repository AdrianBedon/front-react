import { useContext, useEffect, useState } from "react";
import { ReportContext } from "../context/ReportContext";
import { PeakList } from "../components/PeakList";
import { OffList } from "../components/OffList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const ReportPage = () => {
  const [endingDate, setEndingDate] = useState(new Date());
  const [initialDate, setInitialDate] = useState(new Date());
  const [sale, setSale] = useState(0);

  const { peaks, getPeaks, offs, getOffs, sales } = useContext(ReportContext);

  const fetchSale = async () => {
    try {
      const { data } = await axios.post(
        "https://core-viajes.onrender.com/peak/reportSale",
        {
          startDate: initialDate,
          endDate: endingDate,
        }
      );

      setSale(data);
    } catch (error) {
      console.error("Error retrieving sales", error);
    }
  };

  useEffect(() => {
    getPeaks();
  }, []);

  useEffect(() => {
    getOffs();
  }, []);

  return (
    <>
      <div className="container my-4">
        <h2>Reporte de Paquetes Vendidos por Temporada</h2>
        <div className="row">
          <div className="col">
            <p></p>
            <h3>Temporada Alta</h3>
            <p></p>
            {peaks.length === 0 ? (
              <div className="alert alert-warning">
                No hay registros en el sistema!
              </div>
            ) : (
              <PeakList />
            )}
            <p></p>
            <h3>Temporada Baja</h3>
            <p></p>
            {offs.length === 0 ? (
              <div className="alert alert-warning">
                No hay registros en el sistema!
              </div>
            ) : (
              <OffList />
            )}
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text">Fecha Inicial</span>
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
              <span className="input-group-text">Fecha Final</span>
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
            <button
              type="button"
              className="btn btn-create"
              onClick={() => fetchSale()}
            >
              Filtrar
            </button>
          </div>
          <p>La ganancia total neta para el rango de fechas seleccionada es: ${sale}</p>
        </div>
      </div>
    </>
  );
};
