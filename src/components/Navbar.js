import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <header className="nav">
        <nav className="navbar">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
