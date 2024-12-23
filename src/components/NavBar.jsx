import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">Cuisinia</h2>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ingredients">Generate Recipes</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li><
            Link to="/submissions">Submissions</Link>
        </li>
        <li>
            <Link to="/submit">Submit Story</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
