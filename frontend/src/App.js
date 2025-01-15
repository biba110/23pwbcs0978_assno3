// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProducts";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import axios from "axios";

const API_URL = "http://localhost:3002/api/products";

function App() {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<AddProduct setProducts={setProducts} />} />
            <Route path="/all-products" element={<AllProducts products={products} setProducts={setProducts} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
