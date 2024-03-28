import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart";


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    // Initialize cart from local storage or an empty array if no data is stored
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
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

  useEffect(() => {
    // Save cart data to local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    if (product) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="col-10 m-auto">
      <div className="small-square-image-container text-center m-auto">
        <img
          src={`images/product/${product.imageUrl}`}
          alt={product.name}
          className="card-img-top mx-auto small-square-image text-center"
        />
      </div>
      <p>{`images/product/${product.imageUrl}`}</p>
      <h2>{product.name}</h2>
      <h4>{product.category}</h4>
      <p>Description: {product.description}</p>
      <p>Price: ₹{product.price}/day</p>
      {/* Add more product details here */}
      <div>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default ProductDetail;
