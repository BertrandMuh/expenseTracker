import React, { useContext, useState } from "react";
import "./index.css";
import { AppContext } from "../../context";
import { getUserFromSession, login } from "../../usefull-functions/functions";
import { useNavigate } from "react-router-dom";

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
    console.log(formData);
    await login(formData);
    // get session info (user)
    let user = await getUserFromSession();
    setUser(user);

    if (user.firstName) {
      console.log(user);
      navigate("/");
    } else {
      console.log(user);
      document.getElementsByClassName("error")[0].textContent =
        "Email or password incorrect";
    }
  };

  return (
    <div id="login" className="flex flex-column login-register-ctn">
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
  );
};

export default Login;
