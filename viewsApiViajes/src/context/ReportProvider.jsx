import { usePeak } from "../hooks/usePeak";
import { useOff } from "../hooks/useOff";
import { useServer } from "../hooks/useServer";
import { ReportContext } from "./ReportContext";

export const ReportProvider = ({ children }) => {
  const { peaks, getPeaks } = usePeak();
  const { offs, getOffs } = useOff();
  const { servers, getServers } = useServer();

  return (
    <ReportContext.Provider value={{ peaks, offs, servers, getPeaks, getOffs, getServers }}>
      {children}
    </ReportContext.Provider>
  );
};
