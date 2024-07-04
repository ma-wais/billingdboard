import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from "react-select";
import { server } from '../../App';

const SaleReport = () => {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    itemId: null,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${server}/items`);
      const items = response.data.map((item) => ({
        value: item._id,
        label: item.itemName,
      }));
      setItemOptions(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

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
        itemId: formData.itemId || '',
      }).toString();

      const response = await axios.get(`${server}/purchase/sales?${queryParams}`);
      console.log('API Response:', response.data);  // For debugging
      if (response.data && Array.isArray(response.data.sales)) {
        setData(response.data.sales);
      } else {
        throw new Error('Unexpected data structure');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error('Error fetching data:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const flattenSaleData = (sales) => {
    return sales.flatMap(sale => 
      Array.isArray(sale.items) ? sale.items.map(item => ({
        ...item,
        invoiceRef: sale.invoiceRef,
        date: sale.date
      })) : []
    );
  };

  const flattenedData = flattenSaleData(data);

  return (
    <div className="box">
      <div className="heading">
        <p>Sale Report</p>
      </div>
      <div className="inputs">
        <div className="form-group">
          <label>From Date</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>To Date</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} />
        </div>
      </div>
      <div className='submit'>
        <button type="button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Invoice Ref</th>
            <th>Item Name</th>
            <th>Unit</th>
            <th>Qty</th>
            <th>Sale Price</th>
            <th>Total Amt</th>
            <th>Disc. Price</th>
            <th>Net Price</th>
          </tr>
        </thead>
        <tbody>
        {flattenedData.length > 0 ? (
          flattenedData.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.invoiceRef}</td>
              <td>{item.name}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
              <td>{item.salePrice?.toFixed(2) || '0.00'}</td>
              <td>{item.value?.toFixed(2) || '0.00'}</td>
              <td>{item.discountAmount?.toFixed(2) || '0.00'}</td>
              <td>{((item.value || 0) - (item.discountAmount || 0)).toFixed(2)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">No data available</td>
          </tr>
        )}
        </tbody>
      </table>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SaleReport;