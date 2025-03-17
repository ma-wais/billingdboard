import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";
import Select from "react-select";

const ItemLedger = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [ledgerData, setLedgerData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${server}/items`);
        setItems(
          response.data.map((item) => ({
            value: item._id,
            label: item.itemName,
          }))
        );
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${server}/items/stock`, {
        params: {
          itemId: selectedItem?.value,
          from: fromDate,
          to: toDate,
        },
      });
      setLedgerData(response.data);
    } catch (error) {
      console.error("Error fetching ledger data:", error);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Item Ledger</p>
      </div>
      <div className="inputs">
        <Select
          className="basic-single"
          classNamePrefix='custom-select'
          unstyled
          isClearable={true}
          name="item"
          options={items}
          placeholder="Item"
          onChange={(selectedOption) => setSelectedItem(selectedOption)}
        />
        <label htmlFor="from">From</label>
        <input
          type="date"
          name="from"
          id="from"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label htmlFor="to">To</label>
        <input
          type="date"
          name="to"
          id="to"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <div className="submit">
        <button onClick={handleSearch}>Search</button>
      </div>
      {ledgerData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Narration</th>
              <th>Qty In</th>
              <th>Qty Out</th>
              <th>Balance Qty</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.type}</td>
                <td>{entry.narration}</td>
                <td>{entry.qtyIn}</td>
                <td>{entry.qtyOut}</td>
                <td>{entry.balanceQty}</td>
              </tr>
            ))}
          </tbody> 
        </table>
      )}
    </div>
  );
};

export default ItemLedger;