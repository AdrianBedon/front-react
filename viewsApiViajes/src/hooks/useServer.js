import { useReducer } from "react";
import { findAll } from "../services/serverService";
import { serversReducer } from "../reducers/serversReducer";

const initialServers = [];

export const useServer = () => {
  const [servers, dispatch] = useReducer(serversReducer, initialServers);

  const getServers = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingServers",
      payload: result.data.servidores,
    });
  };

  return {
    servers,
    getServers,
  };
};
