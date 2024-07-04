import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { server } from "../../App";

const ExpiryReport = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [expiryDays, setExpiryDays] = useState("");
  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemTypesRes = await axios.get(`${server}/items`);

        setItems(
          itemTypesRes.data.map((type) => ({
            value: type.itemName,
            label: type.itemName,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${server}/purchase`, {
        params: {
          item: selectedItem,
          daysToExpire: expiryDays,
        },
      });
      setPurchaseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching purchase data:", error);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Expiry Report</p>
      </div>
      <div className="inputs">
        <Select
          className="basic-single"
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="item"
          options={items}
          placeholder="Item"
          onChange={(e) => {
            if (e) {
              setSelectedItem(e.value);
            } else {
              setSelectedItem("");
            }
          }}
        />
        <input
          type="number"
          placeholder="Expiry Days"
          value={expiryDays}
          onChange={(e) => setExpiryDays(e.target.value)}
        />
      </div>
      <div className="submit">
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>P. Date</th>
            <th>Bill No#</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Total Qty</th>
            <th>Purchase Price</th>
            <th>Exp. Date</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((purchase) =>
            purchase.purchases.map((item) => (
              <tr key={item._id}>
                <td>{new Date(purchase.dateOfPurchase).toLocaleDateString()}</td>
                <td>{purchase.billNumber}</td>
                <td>{item.item}</td>
                <td>{item.quantity}</td>
                <td>{item.quantity + item.bonusQuantity}</td>
                <td>{item.rate}</td>
                <td>{new Date(item.expiryDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiryReport;
