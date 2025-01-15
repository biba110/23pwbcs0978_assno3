
// import React, { useState } from "react";
// import axios from "axios";
// import EditModal from "./EditModal";
// import "./Styles/AllProducts.css";

// const API_URL = "http://localhost:3002/api/products";

// function AllProducts({ products, setProducts }) {
//   const [showModal, setShowModal] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   // Delete product from the API
//   const handleDelete = (id) => {
//     axios
//       .delete(`${API_URL}/${id}`)  // Use product._id for deletion
//       .then(() => {
//         setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));  // Use product._id to filter
//       })
//       .catch((error) => {
//         console.error("Error deleting product:", error);
//       });
//   };

//   const handleEdit = (product) => {
//     setCurrentProduct(product);
//     setShowModal(true);
//   };

//   return (
//     <div className="all-products-container">
//       {products.map((product) => (
//         <div className="product-card" key={product._id}> {/* Use _id as key */}
//           <div className="product-info">
//             <h2>{product.name}</h2> {/* Update title to name for consistency */}
//             <p>${product.price}</p>
//             <p>{product.description}</p>
//           </div>
//           <div className="dropdown">
//             <button className="dots-btn">•••</button>
//             <div className="dropdown-content">
//               <button onClick={() => handleEdit(product)}>Edit</button>
//               <button onClick={() => handleDelete(product._id)}>Delete</button> {/* Use _id for delete */}
//             </div>
//           </div>
//         </div>
//       ))}
//       {showModal && (
//         <EditModal
//           product={currentProduct}
//           setProducts={setProducts}
//           products={products}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default AllProducts;

import React, { useState } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import "./Styles/AllProducts.css";

const API_URL = "http://localhost:3002/api/products";
const CART_API_URL = "http://localhost:3002/api/cart";  // Add Cart API URL

function AllProducts({ products, setProducts }) {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Static userId and quantity
  const userId = '12345';  // Hardcoded userId
  const quantity = 1;  // Static quantity

  // Delete product from the API
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)); // Use _id to filter
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    axios
      .post(CART_API_URL, {
        userId: userId,        // Static userId
        productId: product._id, // Pass the product ID
        quantity: quantity     // Static quantity
      })
      .then(() => {
        alert("Product added to cart!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart.");
      });
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  return (
    <div className="all-products-container">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
          <div className="dropdown">
            <button className="dots-btn">•••</button>
            <div className="dropdown-content">
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
          {/* Add "Add to Cart" button */}
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
      {showModal && (
        <EditModal
          product={currentProduct}
          setProducts={setProducts}
          products={products}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default AllProducts;
