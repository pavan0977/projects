import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { NavBar } from "./pages/NavBar";
import Login from "./pages/Login";
import { Movies } from "./pages/Movies";
import { Bookings } from "./pages/Bookings";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["userName"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (cookies.userName) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [cookies, theme]);

  const handleLogout = () => {
    removeCookie("userName");
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const bodyStyle = {
    minHeight: "100vh", 
    display: "flex",
    flexDirection: "column",  
    backgroundColor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    transition: "background-color 0.3s ease, color 0.3s ease"
  };

  return (
    <BrowserRouter>
      <div style={bodyStyle}>
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} toggleTheme={toggleTheme} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/movies" replace /> : <Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/movies"
            element={isLoggedIn ? <Movies /> : <Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/bookingPage"
            element={isLoggedIn ? <Bookings /> : <Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
