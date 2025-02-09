import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/authSlice";
import LoadingSpinner from "./LoadingSpinner";

const Signup = ({ onSwitch }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      dispatch(signupUser(credentials));
    }, 2000);
  };

  return (
    <div className="login-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
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
          {!isLoading ? "Signup" : <LoadingSpinner />}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <p>
        Already have an account?{" "}
        <button className="switch-btn" onClick={onSwitch}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
