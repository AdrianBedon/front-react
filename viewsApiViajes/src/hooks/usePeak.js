import { useReducer } from "react";
import { findAll } from "../services/peakService";
import { peaksReducer } from "../reducers/peaksReducer";

const initialPeaks = [];

export const usePeak = () => {
  const [peaks, dispatch] = useReducer(peaksReducer, initialPeaks);

  const getPeaks = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingPeaks",
      payload: result.data,
    });
  };

  return {
    peaks,
    getPeaks,
  };
};
