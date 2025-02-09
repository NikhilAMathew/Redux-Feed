import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/authSlice";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { fetchPosts } from "./store/postSlice";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container">
      {isLoggedIn ? (
        <Home />
      ) : showSignup ? (
        <Signup onSwitch={() => setShowSignup(false)} />
      ) : (
        <Login onSwitch={() => setShowSignup(true)} />
      )}
    </div>
  );
};

export default App;
