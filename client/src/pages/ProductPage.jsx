import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevant'); // Default sorting option
  const [selectedCategory, setSelectedCategory] = useState(''); // Default selected category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://rentkr.onrender.com/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortBy === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  const filteredProducts = selectedCategory
    ? sortedProducts.filter(product => product.category === selectedCategory)
    : sortedProducts;

  return (
    <div className="bg-dark p-0 flex text-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-warning mb-0 p-2">Products</h1>
          <div className="d-flex align-items-center">
            <select className="form-select me-2 bg-dark text-warning" value={sortBy} onChange={handleSortChange}>
              <option value="relevant">Relevant</option>
              <option value="lowToHigh">Low to High Price</option>
              <option value="highToLow">High to Low Price</option>
            </select>
            <select className="form-select bg-dark text-warning" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Automobile">Automobile</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Instrument">Instrument</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="row container-fluid">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredProducts.map(product => (
              <div key={product._id} className="col-lg-4 col-sm-6 mb-4 p-0">
                <Link to={`/products/${product._id}`} className='text-decoration-none'>
                  <div className="card text-center bg-dark text-warning ">
                    <div className="small-square-image-container text-center m-auto ">
                      <img
                        src={`${product.imageUrl}`}
                        alt={product.name}
                        className="card-img-top mx-auto small-square-image text-center"
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
