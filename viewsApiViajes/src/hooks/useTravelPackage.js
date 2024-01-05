import { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { travelPackagesReducer } from "../reducers/travelPackagesReducer";
import { save } from "../services/travelPackageService";
import { useNavigate } from "react-router-dom";
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
  const [packages, dispatch] = useReducer(travelPackagesReducer, initialPackages);
  const [packageSelected, setPackageSelected] = useState(initialPackageForm);
  const { login, handlerLogout } = useContext(AuthContext);

  /*const getUsers = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingUsers",
      payload: result.data,
    });
  };*/

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

  /*const handlerRemoveUser = (id) => {
    if (!login.isAdmin) return;
    Swal.fire({
      title: "Are you sure?",
      text: " Warning! You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(id);
          dispatch({
            type: "removeUser",
            payload: id,
          });
          Swal.fire({
            title: "User Deleted!",
            text: "The user has been deleted.",
            icon: "success",
          });
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerUserSelectedForm = (user) => {
    setVisibleForm(true);
    setUserSelected({ ...user });
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  };*/

  return {
    packages,
    packageSelected,
    initialPackageForm,
    handlerAddPackage,
  };
};
