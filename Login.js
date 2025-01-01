import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["userName"]);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      setCookie("userName", name, { path: "/" });
      onLogin();
      toast.success("LOGIN successful!");
      navigate("/movies");
    } else {
      toast.error("Please enter your name!");
    }
  };

  const containerStyle = {
    marginTop: "10%",
    textAlign: "center",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    margin: "10px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    width: "250px",
    marginTop: "20px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "2rem", color: "#4CAF50" }}>Login</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button
        onClick={handleLogin}
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Login
      </button>
      <ToastContainer />
    </div>
  );
}

export default Login;
