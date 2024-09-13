import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../index.css";
import { handleError, handleSuccess } from "../utils";

function Singup() {
  const navigator = useNavigate();
  const [singupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const tempInfo = { ...singupInfo };
    tempInfo[name] = value;
    setSignupInfo((singupInfo) => tempInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = singupInfo;
    if (!name || !email || !password)
      return handleError("All fields required !");
    try {
      const url = "https://auth-mern-app-henna.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(singupInfo),
      });
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigator("/login");
        }, 1000);
      } else if (error) {
        const err = error.details[0].message;
        return handleError(err);
      }
      if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            autoComplete="name"
            onChange={handleChange}
            placeholder="Enter you name here"
            value={singupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            autoComplete="email"
            placeholder="Enter you email..."
            value={singupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter you name here"
            autoComplete="password"
            value={singupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Singup;
