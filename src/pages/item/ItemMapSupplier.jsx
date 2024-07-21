import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { server } from "../../App";

const ItemMapSupplier = () => {
  const [quantity, setQuantity] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchAccounts, fetchItems] = await Promise.all([
          axios.get(`${server}/accounts`),
          axios.get(`${server}/items`),
        ]);
        const accountsRes = fetchAccounts.data.map((item) => ({
          value: item.accountName,
          label: item.accountName,
          ...item,
        }));
        const items = fetchItems.data.map((item) => ({
          value: item.itemName,
          label: item.itemName,
          ...item,
        }));
        setAccounts(accountsRes);
        setItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post(`${server}/item-map-suppliers`, {
        supplierName: supplier,
        item: selectedOption,
        quantity: quantity,
      });

      setQuantity("");
      alert("Item Map Supplier added successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="box">
      <div className="heading">Item Map Supplier Add</div>
      <div className="inputs">
        <div className="row-inputs">
          <Select
            className="basic-single"
            isClearable={true}
            isSearchable={true}
            name="account"
            options={accounts}
            placeholder="Account"
            onChange={(e) => {
              if (e) {
                setAccount(e.value);
              }
            }}
          />
        </div>

        <div className="row-inputs">
          <Select
            className="basic-single"
            isClearable={true}
            isSearchable={true}
            name="item"
            options={items}
            placeholder="Item"
            onChange={(e) => {
              if (e) {
                setSelectedOption(e.value);
              }
            }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ padding: "8px", width: "100px" }}
          />
          <div className="submit" style={{ borderTop: "none" }}>
            <button>Add To Table</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemMapSupplier;
