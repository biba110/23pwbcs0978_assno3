// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Styles/Cart.css";

// const CART_API_URL = "http://localhost:3002/api/cart";

// function CartProducts() {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const userId = "12345"; // Static userId (can be dynamic based on logged-in user)

//   // Fetch the user's cart from the API or localStorage
//   useEffect(() => {
//     // Check if cart exists in localStorage
//     const savedCart = JSON.parse(localStorage.getItem(`cart-${userId}`));
//     if (savedCart) {
//       setCart(savedCart);
//       setLoading(false);
//     } else {
//       // Fetch from API if not found in localStorage
//       axios
//         .get(`${CART_API_URL}/${userId}`)
//         .then((response) => {
//           setCart(response.data.cart);
//           setLoading(false);
//           localStorage.setItem(`cart-${userId}`, JSON.stringify(response.data.cart)); // Store in localStorage
//         })
//         .catch((error) => {
//           console.error("Error fetching cart products:", error);
//           setLoading(false);
//         });
//     }
//   }, []);

//   // Remove product from cart and update localStorage
//   const handleRemoveFromCart = (productId) => {
//     axios
//       .delete(CART_API_URL, {
//         data: {
//           userId: userId,
//           productId: productId,
//         },
//       })
//       .then(() => {
//         // Remove product from cart locally
//         setCart((prevCart) => {
//           const updatedCart = {
//             ...prevCart,
//             products: prevCart.products.filter((product) => product.productId !== productId),
//           };
//           localStorage.setItem(`cart-${userId}`, JSON.stringify(updatedCart)); // Update localStorage
//           return updatedCart;
//         });
//         // Show alert
//         window.alert("Product has been removed from your cart.");
//       })
//       .catch((error) => {
//         console.error("Error removing product from cart:", error);
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!cart || cart.products.length === 0) {
//     return <div>Your cart is empty.</div>;
//   }

//   return (
//     <div className="cart-products-container">
//       <h1>Your Cart</h1>
//       {cart.products.map((item) => (
//         <div className="cart-product-card" key={item.productId}>
//           <div className="cart-product-info">
//             <h2>{item.productId.name}</h2> {/* Display the product name */}
//             <p>${item.productId.price}</p> {/* Display the product price */}
//             <p>{item.productId.description}</p> {/* Display product description */}
//             <p>Quantity: {item.quantity}</p> {/* Display product quantity */}
//           </div>
//           <button
//             className="remove-from-cart-btn"
//             onClick={() => handleRemoveFromCart(item.productId._id)} // Remove the product from cart
//           >
//             Remove from Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CartProducts;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Cart.css";

const CART_API_URL = "http://localhost:3002/api/cart";

function CartProducts() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = "12345"; // Static userId (can be dynamic based on logged-in user)

  // Fetch the user's cart
  useEffect(() => {
    axios
      .get(`${CART_API_URL}/${userId}`)
      .then((response) => {
        setCart(response.data.cart);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart products:", error);
        setLoading(false);
      });
  }, []);

  // Add product to cart
  const handleAddToCart = (productId) => {
    axios
      .post(`${CART_API_URL}/add`, { productId })  // Add productId to the cart
      .then((response) => {
        alert("Product added to cart!");
        setCart(response.data.cart);  // Update cart in state
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  // Remove product from cart
  const handleRemoveFromCart = (productId) => {
    axios
      .delete(`${CART_API_URL}/`, { data: { productId } })
      .then(() => {
        alert("Product removed from cart!");
        setCart((prevCart) => ({
          ...prevCart,
          products: prevCart.products.filter((item) => item.productId._id !== productId),
        }));
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.products.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-products-container">
      <h1>Your Cart</h1>
      {cart.products.map((item) => (
        <div className="cart-product-card" key={item.productId._id}>
          <div className="cart-product-info">
            <h2>{item.productId.name}</h2> {/* Display the product name */}
            <p>${item.productId.price}</p> {/* Display the product price */}
            <p>{item.productId.description}</p> {/* Display product description */}
            <p>Quantity: {item.quantity}</p> {/* Display product quantity */}
          </div>
          <button
            className="remove-from-cart-btn"
            onClick={() => handleRemoveFromCart(item.productId._id)} // Remove the product from cart
          >
            Remove from Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartProducts;
