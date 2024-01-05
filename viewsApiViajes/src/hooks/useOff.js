import { useReducer } from "react";
import { findAll } from "../services/offService";
import { offsReducer } from "../reducers/offsReducer";

const initialOffs = [];

export const useOff = () => {
  const [offs, dispatch] = useReducer(offsReducer, initialOffs);

  const getOffs = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingOffs",
      payload: result.data,
    });
  };

  return {
    offs,
    getOffs,
  };
};
