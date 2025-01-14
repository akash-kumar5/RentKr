// CategoryPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('relevant'); // Default sorting option

  useEffect(() => {
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

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortBy === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  // Apply filtering logic if needed
  const filteredProducts = sortedProducts;

  return (
    <div className="text-light bg-dark">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-warning mb-0 p-2">{category} to Rent<span className="text-light">Now</span></h1>
        <div className="d-flex align-items-center">
          <select className="form-select me-2 bg-dark text-warning" value={sortBy} onChange={handleSortChange}>
            <option value="relevant">Relevant</option>
            <option value="lowToHigh">Low to High Price</option>
            <option value="highToLow">High to Low Price</option>
          </select>
        </div>
      </div>
      <hr />
      <ul className="row container-fluid">
        {filteredProducts.map(product => (
          <div key={product._id} className="col-lg-4 mb-4">
            <Link to={`/products/${product._id}`} className='text-decoration-none'>
              <div className="card text-center bg-dark text-warning ">
                <div className="small-square-image-container text-center m-auto ">
                  <img
                    src={`${product.imageUrl}`}
                    alt={product.name}
                    className="card-img-top mx-auto small-square-image text-center"
                    height="200rem"
                    width="200rem"
                  />
                </div>
                <div className="card-body">
                  {/* <h3>Category : {product.category}</h3> */}
                  <h5 className="card-title">{product.name}</h5>
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
