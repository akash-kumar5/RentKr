// ProductListPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

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
      <ul className="row">
        {products.map(product => (
            <div key={product._id} className="col-lg-4 mb-4">
              <Link to={`/products/${product._id}`}>
                <div className="card text-center">
                  <div className="small-square-image-container text-center m-auto">
                    <img
                      src={`images/product/${product.imageUrl}`}
                      alt={product.name}
                      className="card-img-top mx-auto small-square-image text-center"
                    />
                  </div>
                  <div className="card-body">
                    <h3>Category : {product.category}</h3>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Price: ₹{product.price}/day</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
