import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

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

    if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
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
    </div>
  );
};

export default ProductDetail;
