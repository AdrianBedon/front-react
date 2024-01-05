import { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { travelPackagesReducer } from "../reducers/travelPackagesReducer";
import { save } from "../services/travelPackageService";
import { AuthContext } from "../auth/context/AuthContext";

const initialPackages = [];

const initialPackageForm = {
  id: 0,
  name: "",
  initDate: "",
  endDate: "",
  hotel: "",
  flight: "",
  price: 0,
  username: "",
  amount: 0,
};

export const useTravelPackage = () => {
  const [packages, dispatch] = useReducer(
    travelPackagesReducer,
    initialPackages
  );
  const [packageSelected, setPackageSelected] = useState(initialPackageForm);
  const { login, handlerLogout } = useContext(AuthContext);

  const getPackages = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingPackages",
      payload: result.data,
    });
  };

  const handlerAddPackage = async (tPackage) => {
    let response;
    try {
      if (tPackage.id === 0) {
        response = await save(tPackage);
      }

      dispatch({
        type: tPackage.id === 0 ? "addPackage" : "",
        payload: response.data,
      });

      Swal.fire({
        title: tPackage.id === 0 ? "Paquete Creado" : "Paquete Actualizado",
        text:
          tPackage.id === 0
            ? "El paquete ha sido creado con éxito"
            : "El paquete ha sido actualizado con éxito",
        icon: "success",
      });
      handlerCloseForm();
      navigate("/hotel");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  return {
    packages,
    packageSelected,
    getPackages,
    initialPackageForm,
    handlerAddPackage,
  };
};
