import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {
  username: "",
  password: "",
};
export const LoginPage = () => {
  const { handlerLogin } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      Swal.fire(
        "Validation Error",
        "Username and password are required",
        "error"
      );
    }
    handlerLogin({ username, password });
    setLoginForm(initialLoginForm);
  };

  return (
    <section className="vh-100 bg-gradient-login">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="card">
              <div className="card-body">
                <h5 className="text-center mb-5">Login</h5>
                <form onSubmit={onSubmit}>
                  <div className="input-group mb-3">
                    <span className="input-group-text">👤</span>
                    <input
                      className="form-control w-30"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">🔑</span>
                    <input
                      className="form-control w-30"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="d-flex justify-content-center text-body">
                    <button
                      type="submit"
                      className="btn btn-success gradient-custom"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
