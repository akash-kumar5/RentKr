import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingProducts, setMatchingProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const products = response.data;
        
        if (products && Array.isArray(products)) {
          const filteredProducts = products.filter((product) =>
            product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setMatchingProducts(filteredProducts);
        } else {
          setMatchingProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (searchQuery !== "") {
      fetchProducts();
    } else {
      setMatchingProducts([]);
    }
  }, [searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLinkClick = () => {
    setSearchQuery(""); // Clear the search query when a link is clicked
  };

  return (
    <div className="container m-0">
      <form className="d-flex my-xl-3 m-0" onSubmit={handleSubmit}>
        <input
          className="form-control me-xl-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={handleChange}
        />
        <button className="btn btn-warning" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
      <div className="container justify-content-center position-relative">
      <div className="text-warning position-absolute start-0 end-0 overflow-auto" style={{ zIndex: 9999, maxHeight: "200px"}} >
        {matchingProducts.length > 0 && (
          <ul className="list-group">
            {matchingProducts.map((product) => (
              <Link to={`/products/${product._id}`} className="list-group-item list-group-item-action" key={product._id} onClick={handleLinkClick}>
                {product.name}
              </Link>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  );
};

export default SearchBar;
