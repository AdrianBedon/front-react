import { useState } from "react";
import Swal from "sweetalert2";
import { useKeycloak } from "@react-keycloak/web";

const initialLoginForm = {
  username: "",
  password: "",
};
export const LoginPage = () => {
  const { keycloak } = useKeycloak();
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await keycloak.login({
        loginForm 
      });
    } catch (error) {
      Swal.fire(
        "Validation Error",
        "Username and password are required",
        "error"
      );
      console.error("Failed to log in", error);
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 bg-gradient-login">
        <div className="modal" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="card bg-dark">
                <div className="card-body p-5">
                  <h5 className="text-center text-uppercase mb-2 log-text">Login</h5>
                  <p className="p-login mb-5 text-center">
                    Please enter your username and password
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-4">
                      <span className="input-group-text">👤</span>
                      <input
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onInputChange}
                      />
                    </div>

                    <div className="input-group mb-4">
                      <span className="input-group-text">🔑</span>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success gradient-custom text-body w-100 mb-4"
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
      </div>
    </section>
  );
};
