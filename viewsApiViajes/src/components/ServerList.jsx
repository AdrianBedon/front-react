import { useContext } from "react";
import { ServerRow } from "./ServerRow";
import { ReportContext } from "../context/ReportContext";

export const ServerList = () => {
  const { servers } = useContext(ReportContext);

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Direccion IP</th>
            <th className="text-center">Sistema Operativo</th>
            <th className="text-center">Motor de Base</th>
          </tr>
        </thead>
        <tbody>
          {servers.map(({ nombre, direccionIP, SO, motorBase }) => (
            <ServerRow
              key={nombre}
              nombre={nombre}
              direccionIP={direccionIP}
              SO={SO}
              motorBase={motorBase}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
