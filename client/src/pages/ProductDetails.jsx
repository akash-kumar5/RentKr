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
          `/products/${productId}`
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

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const cartResponse = await axios.get(`/cart/${user._id}`);
          console.log(cartResponse.data);
          if (!cartResponse.data.items) {
            // If user does not have a cart, create one
            const response = await axios.post("/cart/create", {
              userId: user._id,
              items: [],
              totalAmount: 0,
            });
            console.log(response);
          }
          // Fetch the cart again after creating or checking for the cart
          const newCartResponse = await axios.get(`/cart/${user._id}`);
          setCart(newCartResponse.data.items);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async () => {
    if (!product) return;
  
    try {
      if (user) {
        // If user is logged in, add to cart through the API
        const cartResponse = await axios.get(`/cart/${user._id}`);
        const cart = cartResponse.data;
  
        const existingItemIndex = cart.items.findIndex((item) => item.productId === product._id);
  
        if (existingItemIndex !== -1) {
          // If the product is already in the cart, update its quantity
          const updatedCart = [...cart.items];
          updatedCart[existingItemIndex].quantity += 1;
          await axios.put(`/cart/update`, {
            userId: user._id,
            productId: product._id,
            quantity: updatedCart[existingItemIndex].quantity,
          });
          setCart(updatedCart);  // Update the cart state
        } else {
          // If the product is not in the cart, add it to the cart
          await axios.post("/cart/add", {
            userId: user._id,
            productId: product._id,
            quantity: 1,
            price: product.price,
          });
          const newCartResponse = await axios.get(`/cart/${user._id}`);
          setCart(newCartResponse.data.items);  // Update the cart state
        }
      } else {
        // If the user is not logged in, add to localStorage
        let cachedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  
        // Check if the item is already in the cache
        const existingItemIndex = cachedCart.findIndex((item) => item.productId === product._id);
  
        if (existingItemIndex !== -1) {
          // If the product is already in the cache, update its quantity
          cachedCart[existingItemIndex].quantity += 1;
        } else {
          // If the product is not in the cache, add it
          cachedCart.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
          });
        }
  
        // Save updated cart to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cachedCart));
        setCart(cachedCart);  // Update the cart state
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  

  const removeFromCart = async (index) => {
    if (!cart) return;

    try {
      const productId = cart[index].productId;
      await axios.delete(`/cart/${user._id}/${productId}`);
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
          {cart && cart.length > 0 ? (
            <Cart cart={cart} removeFromCart={removeFromCart} />
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
