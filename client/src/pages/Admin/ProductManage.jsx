import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (productId) => {
    navigate("/editproduct")
    // Navigate to the edit page for the selected product
    // You can implement this based on your routing setup
    console.log(`Editing product with ID: ${productId}`);
    localStorage.setItem("pid",productId);
  };

  return (
    <div className="container-fluid bg-dark p-4 ">
      <div className='d-flex justify-content-between align-items-center mt-2 m-4 ps-3 pe-3'>
  <h2 className='text-warning text-center mb-0'>Product Management</h2>
  <div>
    <NavLink to="/additem" className="btn btn-warning fs-5">
      Add Product
    </NavLink>
  </div>
</div>

      
      <hr className='text-light' />
      <table className="table table-dark ">
        <thead >
          <tr className='text-warning'>
            <th className='text-warning'>ID</th>
            <th className='text-warning'>Name</th>
            <th className='text-warning'>Category</th>
            <th className='text-warning'>Description</th>
            <th className='text-warning'>Price</th>
            <th className='text-warning'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td className='w-40'>{product.description}</td>
              <td>₹{product.price}</td>
              <td className='d-flex pb-5'>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManage;
