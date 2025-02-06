import React, { useState } from 'react';

const Shop = () => {
  const [formData, setFormData] = useState({
    shopName: localStorage.getItem('shopName') || '',
    owner: localStorage.getItem('owner') || '',
    address: localStorage.getItem('address') || '',
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    image: localStorage.getItem('image') || '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        localStorage.setItem('image', reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    localStorage.setItem('shopName', formData.shopName);
    localStorage.setItem('owner', formData.owner);
    localStorage.setItem('address', formData.address);
    localStorage.setItem('phoneNumber', formData.phoneNumber);
    
    alert('Shop created successfully!');
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
          <button type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shop;
