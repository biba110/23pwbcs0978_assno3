import React, { useState } from "react";
import axios from "axios";
import "./Styles/AddProducts.css"; 

const API_URL = "http://localhost:3002/api/products/";

function AddProduct({ setProducts }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure fields are properly formatted
    const newProduct = {
      name: product.title.trim(),  // Updated to 'name' to match the backend
      price: isNaN(parseFloat(product.price)) ? 0 : parseFloat(product.price),  // Ensure 'price' is a valid number
      description: product.description.trim(),
    };

    try {
      const response = await axios.post(API_URL, newProduct);
      alert("Product added successfully!");
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setProduct({ title: "", price: "", description: "" });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please check your input.");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Product Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="e.g., Smart Watch"
          value={product.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="e.g., 1000"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          value={product.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="add-button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
