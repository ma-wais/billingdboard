import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [totals, setTotals] = useState({
    totalSoldQty: 0,
    totalCost: 0,
    totalSaleValue: 0,
    totalDiscount: 0,
    totalNetAmount: 0,
    totalProfit: 0
  });
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
      }).toString();
  
      const response = await axios.get(`${server}/purchase/sales?${queryParams}`);
      if (response.data && Array.isArray(response.data.sales)) {
        setData(response.data.sales);
        setTotals(response.data.totals || {
          totalSoldQty: 0,
          totalCost: 0,
          totalSaleValue: 0,
          totalDiscount: 0,
          totalNetAmount: 0,
          totalProfit: 0
        });
      } else {
        throw new Error('Unexpected data structure');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error('Error fetching data:', err);
      setData([]);
      setTotals({
        totalSoldQty: 0,
        totalCost: 0,
        totalSaleValue: 0,
        totalDiscount: 0,
        totalNetAmount: 0,
        totalProfit: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const flattenSaleData = (sales) => {
    if (!Array.isArray(sales)) return [];
    return sales.flatMap(sale => 
      Array.isArray(sale.items) ? sale.items.map(item => ({
        ...item,
        invoiceRef: sale.invoiceRef,
        date: sale.date
      })) : []
    );
  };

  const flattenedData = Array.isArray(data) ? flattenSaleData(data) : [];


  return (
    <div className="box">
      <div className="heading">
        <p>Profit Report</p>
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
            <th>Sold Qty</th>
            {/* <th>Cost</th> */}
            <th>Sale Value</th>
            <th>Discount</th>
            <th>Net Amount</th>
            {/* <th>Profit</th> */}
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.invoiceRef}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              {/* <td>{item.cost.toFixed(2)}</td> */}
              <td>{item.value.toFixed(2)}</td>
              <td>{item.discountAmount.toFixed(2)}</td>
              <td>{(item.value - item.discountAmount).toFixed(2)}</td>
              {/* <td>{item.profit.toFixed(2)}</td> */}
            </tr>
          ))}
          <tr>
            <td colSpan="3">Total</td>
            <td>{totals.totalSoldQty}</td>
            {/* <td>{totals.totalCost.toFixed(2)}</td> */}
            <td>{totals.totalSaleValue.toFixed(2)}</td>
            <td>{totals.totalDiscount.toFixed(2)}</td>
            <td>{totals.totalNetAmount.toFixed(2)}</td>
            {/* <td>{totals.totalProfit.toFixed(2)}</td> */}
          </tr>
        </tbody>
      </table>
      <div>
        <p>Bill Discount: {totals.totalDiscount.toFixed(2)}</p>
        <p>Special Discount/Adjustment: {data.reduce((sum, sale) => sum + sale.specialDiscountReceived, 0).toFixed(2)}</p>
        <p>Total Sales Value: {totals.totalSaleValue.toFixed(2)}</p>
        {/* <p>Total Sale Profit: {totals.totalProfit.toFixed(2)}</p> */}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SaleReport;