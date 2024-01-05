import { useContext, useEffect } from "react";
import { ReportContext } from "../context/ReportContext";
import { PeakList } from "../components/PeakList";
import { OffList } from "../components/OffList";

export const ReportPage = () => {
  const { peaks, getPeaks, offs, getOffs } = useContext(ReportContext);

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
      </div>
    </>
  );
};
