import React, { useState} from 'react';
import axios from 'axios';
import './list.scss';
import { server } from '../App';

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
        to: formData.toDate,
        invoiceref: formData.invoiceRef,
        customername: formData.customerName,
        customerphone: formData.customerPhone
      }).toString();
  
      const response = await axios.get(`${server}/purchase/sales?${queryParams}`);
      
      // Check if response.data is an array, if not, look for a nested array
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else if (response.data && Array.isArray(response.data.sales)) {
        setData(response.data.sales);
      } else {
        console.error('Unexpected data structure:', response.data);
        setData([]);
        setError('Received unexpected data format from server');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error('Error fetching data:', err);
      setData([]);
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
        <div className="form-group">
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
        </div>
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
            <th>Login Name</th>
            <th>Customer Name</th>
            <th>Sale Value</th>
            <th>Discount</th>
            <th>Net Value</th>
            {/* <th>Action</th> */}
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
                <td>{item.user}</td>
                <td>{item.customerName}</td>
                <td>{item.totalAmount.toFixed(2)}</td>
                <td>{item.discountPrice.toFixed(2)}</td>
                <td>{item.netPrice.toFixed(2)}</td>
                {/* <td>
                  <button onClick={() => console.log('View details', item._id)}>View</button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;