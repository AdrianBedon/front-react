import { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { findAll, remove, save, update } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();
  //const { login, handlerLogout } = useContext(AuthContext);

  const getUsers = async () => {
    const result = await findAll();
    console.log(result);
    dispatch({
      type: "loadingUsers",
      payload: result.data,
    });
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) return;
    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
      } else {
        response = await update(user);
      }

      dispatch({
        type: user.id === 0 ? "addUser" : "updateUser",
        payload: response.data,
      });

      Swal.fire({
        title: user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
        text:
          user.id === 0
            ? "El usuario ha sido creado con éxito"
            : "El usuario ha sido actualizado con éxito",
        icon: "success",
      });
      handlerCloseForm();
      navigate("/user");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerRemoveUser = (id) => {
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
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  };
};
