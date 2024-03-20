// AddItem.js
import React, { useState } from 'react';

const AddItem = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products/additem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price, category, imageUrl }),
      });
      if (!response.ok) {
        alert("error");
        throw new Error('Error adding product');
      }
      alert("Product added");
      const data = await response.json();
      onAdd(data); // Update parent component with new product
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImageUrl('');
      
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className='form-control container-fluid bg-dark'>
        <h2 className='text-warning text-center mt-3 p-2'>Add Product Form</h2>
    <form onSubmit={handleSubmit} className='form-control bg-dark text-warning ps-xl-5 pe-xl-5 p-2'>
      <div>
        <label>Name:</label>
        <input
         className='form-control p-2 pt-3 mt-2'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
         className='form-control p-2 pt-3 mt-2'
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
         className='form-control p-2 pt-3 mt-2'
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
         className='form-control p-2 pt-3 mt-2'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="two-wheeler">Two-wheeler</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div>
        <label>Image URL:</label>
        <input
         className='form-control p-2 pt-3 mt-2'
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit" className='btn btn-lg btn-warning text-dark m-auto'>Add Product</button>
    </form>
    </div>
  );
};

export default AddItem;
