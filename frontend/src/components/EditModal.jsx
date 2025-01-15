// // src/components/EditModal.js
// import React, { useState } from "react";
// import axios from "axios";
// import "./Styles/EditModal.css";

// const API_URL = "http://localhost:3002/api/products";

// function EditModal({ product, setProducts, products, onClose }) {
//   const [updatedProduct, setUpdatedProduct] = useState(product);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedProduct({ ...updatedProduct, [name]: value });
//   };

//   const handleSave = () => {
//     axios
//       .put(`${API_URL}/${updatedProduct.id}`, updatedProduct)
//       .then((response) => {
//         const updatedProducts = products.map((p) =>
//           p.id === updatedProduct.id ? response.data : p
//         );
//         setProducts(updatedProducts);
//         onClose();
//       })
//       .catch((error) => {
//         console.error("Error updating product:", error);
//       });
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Edit Product</h2>
//         <label>Title</label>
//         <input
//           type="text"
//           name="title"
//           value={updatedProduct.title}
//           onChange={handleChange}
//         />
//         <label>Price</label>
//         <input
//           type="number"
//           name="price"
//           value={updatedProduct.price}
//           onChange={handleChange}
//         />
//         <label>Description</label>
//         <textarea
//           name="description"
//           value={updatedProduct.description}
//           onChange={handleChange}
//         ></textarea>
//         <button onClick={handleSave}>Save</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// }

// export default EditModal;

// src/components/EditModal.js
import React, { useState } from "react";
import axios from "axios";
import "./Styles/EditModal.css";  // Import the CSS file for modal styling

const API_URL = "http://localhost:3002/api/products";

function EditModal({ product, setProducts, products, onClose }) {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/${product._id}`, updatedProduct);
      // Update the local products state with the updated product
      const updatedProducts = products.map((p) =>
        p._id === product._id ? response.data : p
      );
      setProducts(updatedProducts);
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
