// ProductListPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  // const { category } = match.params;

  useEffect(() => {
    console.log(category)
    console.log(products);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/category/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h1>Products in Category: {category}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
