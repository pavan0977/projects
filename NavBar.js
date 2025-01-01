// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "../CssComponents/NavBar.css";

export const NavBar = ({ isLoggedIn, onLogout, toggleTheme }) => {
  return (
    <nav className="Navbar">
      <Link to="/" className="logo">Cinema App</Link>
      <div className="links">
        <Link to="/movies">Movies</Link>
        <Link to="/bookingPage">Bookings</Link>
        {isLoggedIn && (
          <button onClick={onLogout}>Logout</button>
        )}
        <button onClick={toggleTheme}>Theme Change</button>
      </div>
    </nav>
  );
};
