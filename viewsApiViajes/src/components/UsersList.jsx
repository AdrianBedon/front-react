import { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";

export const UsersList = () => {
  const { users } = useContext(UserContext);

  //const { login } = useContext(AuthContext);

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th className="text-center">Id</th>
            <th className="text-center">Username</th>
            <th className="text-center">Email</th>
            <th className="text-center">Manage</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, username, email }) => (
            <UserRow key={id} id={id} username={username} email={email} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
