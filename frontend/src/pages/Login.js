import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../index.css";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const navigator = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const tempInfo = { ...loginInfo };
    tempInfo[name] = value;
    setLoginInfo(tempInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    if ( !email || !password)
      return handleError("All fields required !");
    try {
      const url = "https://auth-mern-app-henna.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      
      const { message, success, error, jwToken,name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token',jwToken)
        localStorage.setItem('loggedIn',name)
        setTimeout(() => {
          navigator("/home");
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            autoComplete="email"
            placeholder="Enter you email..."
            value={loginInfo.email}
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
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Already have an account?<Link to="/signup">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
