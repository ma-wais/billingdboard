import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { server } from "../../App";

const PurchaseReport = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [supplier, setSupplier] = useState("");
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsResult = await axios.get(`${server}/accounts`);
        const items = accountsResult.data.map((item) => ({
          value: item._id,
          label: item.accountName,
        }));
        setAccounts(items);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${server}/purchase?startDate=${from}&endDate=${to}&supplier=${supplier}`
      );
      if (Array.isArray(response.data)) {
        setData(response.data);
        console.log(response.data);
      } else {
        console.error("Unexpected response data format:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching purchase data:", error);
      setData([]);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "from") {
      setFrom(e.target.value);
    } else if (e.target.name === "to") {
      setTo(e.target.value);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Purchase Report</p>
      </div>
      <div className="inputs">
        <div className="row-inputs">
          <label htmlFor="from">From</label>
          <input
            type="date"
            name="from"
            id="from"
            value={from}
            onChange={handleChange}
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="to">To</label>
          <input
            type="date"
            name="to"
            id="to"
            value={to}
            onChange={handleChange}
          />
        </div>
        <Select
          className="basic-single"
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="supplier"
          options={accounts}
          placeholder="Supplier"
          onChange={(e) => setSupplier(e ? e.value : "")}
        />
      </div>
      <div className="submit">
        <button onClick={handleSubmit}>Search</button>
      </div>
        <table className="table">
          <thead>
            <tr>
              {/* <th>Sr#</th> */}
              <th>P. Date</th>
              <th>Bill No#</th>
              <th>Item Name</th>
              <th>Packs/Bonus</th>
              <th>Qty in Packs</th>
              <th>Price (Per.P)</th>
              <th>Purchase Price</th>
              <th>Disc.%</th>
              <th>Discount Price</th>
              <th>Tax %</th>
              <th>Tax Price</th>
              <th>Net Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((purchase, index) => (
              <React.Fragment key={purchase._id}>
                {purchase.purchases.map((item, itemIndex) => (
                  <tr key={item._id}>
                    {/* <td>{index + 1}</td> */}
                    <td>
                      {new Date(purchase.dateOfPurchase).toLocaleDateString()}
                    </td>
                    <td>{purchase.billNumber}</td>
                    <td>{item.item}</td>
                    <td>{item.bonusQuantity}</td>
                    <td>{item.quantityInPack}</td>
                    <td>{item.rate / item.quantityInPack}</td>
                    <td>{item.rate}</td>
                    <td>{item.discountPercentage}</td>
                    <td>{item.discountAmount}</td>
                    <td>{item.taxPercentage}</td>
                    <td>{item.taxAmount}</td>
                    <td>{item.netAmount}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default PurchaseReport;
