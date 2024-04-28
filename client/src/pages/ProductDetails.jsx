import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart";
import { useAuth } from "../store/auth";

const ProductDetail = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    if (!product) return;
  
    try {
      if (user) {
        const cartResponse = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
        const cart = cartResponse.data;
  
        // Check if the product is already in the cart
        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId === product._id
        );
  
        if (existingItemIndex !== -1) {
          // If the product is already in the cart, update its quantity
          const updatedCart = [...cart.items];
          updatedCart[existingItemIndex].quantity += 1;
          await axios.put(`http://localhost:5000/api/cart/update`, {
            userId: user._id,
            productId: product._id,
            quantity: updatedCart[existingItemIndex].quantity,
          });
          setCart(updatedCart);
          
        } else {
          // If the product is not in the cart, add it to the cart
          await axios.post("http://localhost:5000/api/cart/add", {
            userId: user._id,
            productId: product._id,
            quantity: 1,
            price: product.price,
          });
          const newCartResponse = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
          setCart(newCartResponse.data.items);
        }
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
    window.location.reload();
  };
  
  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container-fluid m-0 bg-light">
      <div className="row">
        <div className="col-xl-9 bg-light p-5">
          <div className="container-fluid flex">
          <h4 className="card-title">{product.name}</h4>
            <img
            width="500rem"
              src={`${product.imageUrl}`}
              alt={product.name}
              className="m-0 p-0"
            />
            <div className="card-body">
              <p className="card-text">{product.description}</p>
              <p className="card-text">Price: ₹{product.price}/day</p>
              <button
                className="btn btn-warning btn-outline-dark text-center"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-3 bg-dark m-xl-0 text-warning p-5 ps-2">
          <h4 className="text-center pt-2">Cart Summary</h4>
          <hr />
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
