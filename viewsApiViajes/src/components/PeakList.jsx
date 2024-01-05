import { useContext } from "react";
import { PeakRow } from "./PeakRow";
import { ReportContext } from "../context/ReportContext";

export const PeakList = () => {
  const { peaks } = useContext(ReportContext);

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th className="text-center">Nombre del Paquete</th>
            <th className="text-center">Fecha de Creación</th>
            <th className="text-center">Cantidad de Paquetes Vendidos</th>
            <th className="text-center">Ingreso Total</th>
          </tr>
        </thead>
        <tbody>
          {peaks.map(({ creation_date, amount, namePackage, total }) => (
            <PeakRow
              key={namePackage}
              creation_date={creation_date}
              amount={amount}
              namePackage={namePackage}
              total={total}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
