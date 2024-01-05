import { usePeak } from "../hooks/usePeak";
import { useOff } from "../hooks/useOff";
import { ReportContext } from "./ReportContext";

export const ReportProvider = ({ children }) => {
  const { peaks, getPeaks } = usePeak();
  const { offs, getOffs } = useOff();

  return (
    <ReportContext.Provider value={{ peaks, offs, getPeaks, getOffs }}>
      {children}
    </ReportContext.Provider>
  );
};
