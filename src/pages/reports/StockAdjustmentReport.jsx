import React, { useState } from "react";
import axios from "axios";
import { server } from "../../App";

const StockAdjustmentReport = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${server}/items/stock?from=${from}&to=${to}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching stock adjustments:", error);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Stock Adjustment Report</p>
      </div>
      <div className="inputs">
        <div className="row-inputs">
          <label htmlFor="from">From</label>
          <input
            type="date"
            name="from"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="to">To</label>
          <input
            type="date"
            name="to"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>
      <div className="submit">
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Item Name</th>
              <th>Unit</th>
              <th>Narration</th>
              <th>Qty In</th>
              <th>Qty Out</th>
              <th>Value In</th>
              <th>Value Out</th>
            </tr>
          </thead>
          <tbody>
            {data.map((adjustment, index) => (
              <tr key={adjustment._id}>
                <td>{new Date(adjustment.date).toLocaleDateString()}</td>
                <td>{adjustment.type}</td>
                <td>{adjustment.item?.itemName}</td>
                <td>{adjustment.item?.unit}</td>
                <td>{adjustment.narration || "N/A"}</td>
                <td>{adjustment.qtyIn}</td>
                <td>{adjustment.qtyOut}</td>
                <td>{adjustment.item?.retailPrice * adjustment.qtyIn}</td>
                <td>{adjustment.item?.retailPrice * adjustment.qtyOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default StockAdjustmentReport;
