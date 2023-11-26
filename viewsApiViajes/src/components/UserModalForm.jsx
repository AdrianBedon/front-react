import { useContext } from "react";
import { UserForm } from "./UserForm";
import { UserContext } from "../context/UserContext";

export const UserModalForm = () => {
  const { userSelected, handlerCloseForm } = useContext(UserContext);

  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="card bg-dark">
              <div className="card-body p-5">
                <h5 className="text-center text-uppercase mb-2">
                  {userSelected.id > 0 ? "Editar" : "Crear"} Usuario
                </h5>
                <p className="p-login mb-5 text-center">User information</p>
                <UserForm
                  userSelected={userSelected}
                  handlerCloseForm={handlerCloseForm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
