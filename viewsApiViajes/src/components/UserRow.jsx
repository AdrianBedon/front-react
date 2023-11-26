import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";

export const UserRow = ({ id, username, email }) => {
  const { handlerUserSelectedForm, handlerRemoveUser } =
    useContext(UserContext);

  const { login } = useContext(AuthContext);

  return (
    <tr>
      <td className="text-center">{id}</td>
      <td className="text-center">{username}</td>
      <td className="text-center">{email}</td>
      {!login.isAdmin || (
        <>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-update"
              onClick={() =>
                handlerUserSelectedForm({
                  id,
                  username,
                  email,
                })
              }
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handlerRemoveUser(id)}
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
