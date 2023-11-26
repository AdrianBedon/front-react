import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const UserForm = ({ userSelected, handlerCloseForm }) => {
  const { initialUserForm, handlerAddUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState(initialUserForm);

  const { id, username, password, email } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: "",
    });
  }, [userSelected]);
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || (!password && id === 0) || !email) {
      Swal.fire({
        title: "Validation Error",
        text: "You must fill out all the fields in the form",
        icon: "error",
      });
      return;
    }
    if (!email.includes("@")) {
      Swal.fire(
        "Validation Email Error",
        "Must be a valid email address",
        "error"
      );

      return;
    }

    //guardar el nuevo registro
    handlerAddUser(userForm);
    setUserForm(initialUserForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group mb-4">
        <input
          className="form-control"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onInputChange}
        />
      </div>

      {id > 0 || (
        <div className="input-group mb-4">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </div>
      )}
      <div className="input-group mb-4">
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
      </div>
      <input type="hidden" name="id" value={id} />
      <button className="btn btn-primary gradient-custom" type="submit">
        {id > 0 ? "Editar" : "Crear"}
      </button>
      {!handlerCloseForm || (
        <button
          className="btn btn-primary btn-danger mx-2"
          type="button"
          onClick={() => onCloseForm()}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
