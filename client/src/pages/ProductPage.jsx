import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-dark">
      <h1 className="text-center text-warning">Products</h1>
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map(product => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProductPage;
