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
      console.log(response.data);
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
                <td>{new Date(adjustment.adjustedAt).toLocaleDateString()}</td>
                <td>{adjustment.adjustmentType}</td>
                <td>{adjustment.itemId?.itemName}</td>
                <td>{adjustment.itemId?.unit}</td>
                <td>{adjustment.narration || "N/A"}</td>
                <td>{adjustment.adjustmentType === "increase" ? adjustment.adjustment : 0}</td>
                <td>{adjustment.adjustmentType === "decrease" ? adjustment.adjustment : 0}</td>
                <td>{adjustment.adjustmentType === "increase" ? (adjustment.adjustment * adjustment.itemId?.retailPrice).toFixed(2) : 0}</td>
                <td>{adjustment.adjustmentType === "decrease" ? (adjustment.adjustment * adjustment.itemId?.retailPrice).toFixed(2) : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default StockAdjustmentReport;
