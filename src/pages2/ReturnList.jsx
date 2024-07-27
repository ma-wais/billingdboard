import React, { useState } from 'react';
import axios from 'axios';
import './list.scss';
import { server } from '../App';  // Assuming you have this import

const List = () => {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    invoiceRef: '',
    customerName: '',
    customerPhone: '',
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        from: formData.fromDate,
        // to: formData.toDate,
        // invoiceref: formData.invoiceRef,
        // customername: formData.customerName,
        // customerphone: formData.customerPhone
      }).toString();

      const response = await axios.get(`${server}/purchase/sale/return?${queryParams}`);
      setData(response.data);
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>From Date</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} />
        </div>
        {/* <div className="form-group">
          <label>To Date</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Invoice Ref#</label>
          <input type="text" name="invoiceRef" value={formData.invoiceRef} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Customer Name</label>
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Customer Phone</label>
          <input type="text" name="customerPhone" value={formData.customerPhone} onChange={handleChange} />
        </div> */}
        <button type="button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <table className="result-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Sale#</th>
            <th>Sale Value</th>
            <th>Discount</th>
            <th>Net Value</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8">No record found</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item._id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.invoiceRef}</td>
                <td>{item.totalAmount.toFixed(2)}</td>
                <td>{item.discountPrice.toFixed(2)}</td>
                <td>{item.netPrice.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;