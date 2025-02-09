import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import LoadingSpinner from "./LoadingSpinner";

const Login = ({ onSwitch }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      dispatch(authActions.login(credentials));
    }, 2000);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button className="login-btn" type="submit">
          {isLoading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        You don't have any account?{" "}
        <button className="switch-btn" onClick={onSwitch}>
          Signup
        </button>
      </p>
    </div>
  );
};

export default Login;
