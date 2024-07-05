import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../../App';

const Shop = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    owner: '',
    address: '',
    phoneNumber: '',
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('shopName', formData.shopName);
    data.append('owner', formData.owner);
    data.append('address', formData.address);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('image', formData.image);

    try {
      const res = await axios.post(`${server}/shops`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({
        shopName: '',
        owner: '',
        address: '',
        phoneNumber: '',
        image: null,
      });
    } catch (error) {
      console.error('Error saving shop:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='box'>
      <div className='heading'>
        <p>Shop</p>
      </div>
      <form className='inputs' onSubmit={handleSubmit}>
        <input
          type='text'
          name='shopName'
          placeholder='Shop Name'
          value={formData.shopName}
          onChange={handleChange}
        />
        <input
          type='text'
          name='owner'
          placeholder='Shop Owner'
          value={formData.owner}
          onChange={handleChange}
        />
        <input
          type='text'
          name='address'
          placeholder='Shop Address'
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type='text'
          name='phoneNumber'
          placeholder='Shop Phone'
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <input
          type='file'
          accept='image/*'
          name='image'
          onChange={handleChange}
        />
        <div className='submit'>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shop;
