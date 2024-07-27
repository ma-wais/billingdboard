import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { server } from "../App";

const Stock = () => {
  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${server}/items`);
      const items = response.data.map((item) => ({
        value: item._id,
        label: item.itemName,
        ...item,
      }));
      setOptions(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = async () => {
    if (selectedItem) {
      setItemData(selectedItem);
    }
  };

  return (
    <div className="stock-container">
      <div className="inputs">
        <form className="item-form" onSubmit={(e) => e.preventDefault()}>
          <Select
            className="basic-single"
            value={selectedItem}
            onChange={setSelectedItem}
            options={options}
            placeholder="Select an item"
          />
          <button type="button" onClick={handleSearch}>Search</button>
        </form>
      </div>

      {itemData && (
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Company</th>
              <th>Unit</th>
              <th>Cost Price</th>
              <th>Retail Price</th>
              <th>Qty in pack</th>
              <th>Status</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{itemData.itemCode}</td>
              <td>{itemData.itemName}</td>
              <td>{itemData.companyName}</td>
              <td>{itemData.unit}</td>
              <td>{itemData.costPerPc}</td>
              <td>{itemData.retailPrice}</td>
              <td>{itemData.quantityInPack}</td>
              <td>{itemData.status}</td>
              <td>{itemData.stock}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Stock;