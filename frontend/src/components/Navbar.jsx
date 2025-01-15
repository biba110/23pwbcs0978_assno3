import React from "react";
import { NavLink } from "react-router-dom";
import "./Styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Add Product
      </NavLink>
      <NavLink 
        to="/all-products" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        All Products
      </NavLink>
      <NavLink 
        to="/cart" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Your Cart
      </NavLink>
    </nav>
  );
}

export default Navbar;
