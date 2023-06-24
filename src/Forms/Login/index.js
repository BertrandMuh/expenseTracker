import React, { useContext, useState } from "react";
import "./index.scss";
import { AppContext } from "../../context";
import { getUserFromSession, login } from "../../usefull-functions/functions";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormOnSubmit = async (event) => {
    event.preventDefault();
    await login(formData);
    // get session info (user)
    let user = await getUserFromSession();
    setUser(user);

    if (user.firstName) {
      navigate("/");
    } else {
      document.getElementsByClassName("error")[0].textContent =
        "Email or password incorrect";
    }
  };

  return (
    <div id="auth" className="flex flex-column center">
      <div className="auth-form-ctn">
        <div id="login" className="flex flex-column login-ctn">
          <h3 className="form-title">Login Form</h3>
          <form
            className="auth-form"
            autoComplete="off"
            onSubmit={handleFormOnSubmit}
          >
            <div className="mb-3 flex start flex-column">
              <label htmlFor="email">
                Email<sup className="bi bi-asterisk"></sup>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3 flex start flex-column">
              <label htmlFor="password">
                Password<sup className="bi bi-asterisk"></sup>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handleFormChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>

        <p className="login-register container-fluid">
          Click <Link to="/auth/register">register</Link> to open an account.
        </p>
      </div>
    </div>
  );
};

export default Login;
