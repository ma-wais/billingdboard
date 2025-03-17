import React, { useEffect, useState } from "react";
import Select from "react-select";
import { server } from "../../App";
import axios from "axios";

const stockTypes = [
  { value: "all", label: "All" },
  { value: "low", label: "Low Stock" },
  { value: "high", label: "High Stock" },
];

const StockReport = () => {
  const [value, setValue] = useState("");
  const [companies, setCompanies] = useState([]);
  const [stockType, setStockType] = useState("");
  const [items, setItems] = useState([]);
  const [company, setCompany] = useState("");
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemTypesRes, companiesRes, accountsRes] = await Promise.all([
          axios.get(`${server}/items`),
          axios.get(`${server}/companies`),
          axios.get(`${server}/accounts`),
        ]);

        setItems(
          itemTypesRes.data.map((type) => ({
            value: type.itemName,
            label: type.itemName,
          }))
        );
        setCompanies(
          companiesRes.data.map((company) => ({
            value: company.companyName,
            label: company.companyName,
          }))
        );
        setAccounts(
          accountsRes.data.map((account) => ({
            value: account.accountName,
            label: account.accountName,
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
      const encodedItemName = encodeURIComponent(value);
      const encodedCompanyName = encodeURIComponent(company);
      const encodedStockType = encodeURIComponent(
        stockType === "all" ? "" : stockType
      );

      const response = await axios.get(
        `${server}/items?itemName=${encodedItemName}&companyName=${encodedCompanyName}&stockType=${encodedStockType}`
      );

      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Stock Report</p>
      </div>
      <div className="inputs">
        <Select
          className="basic-single"
          classNamePrefix="custom-select"
          unstyled
          isClearable={true}
          name="company"
          options={companies}
          placeholder="Company"
          onChange={(e) => {
            if (e) {
              setCompany(e.value);
            } else {
              setCompany("");
            }
          }}
        />
        <Select
          className="basic-single"
          classNamePrefix="custom-select"
          unstyled
          isClearable={true}
          name="account"
          options={accounts}
          placeholder="Account"
          onChange={(e) => {
            if (e) {
              setAccount(e.value);
            } else {
              setAccount("");
            }
          }}
        />
        <Select
          className="basic-single"
          classNamePrefix='custom-select'
          unstyled
          isClearable={true}
          name="item"
          options={items}
          placeholder="Item"
          onChange={(e) => {
            if (e) {
              setValue(e.value);
            } else {
              setValue("");
            }
          }}
        />
        <Select
          className="basic-single"
          classNamePrefix='custom-select'
          unstyled
          isClearable={true}
          name="stockType"
          options={stockTypes}
          placeholder="Stock Type"
          onChange={(e) => {
            if (e) {
              setStockType(e.value);
            } else {
              setStockType("");
            }
          }}
        />
      </div>
      <div className="submit">
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            {/* <th>Sr.</th> */}
            <th>Item Name</th>
            <th>Stock Qty</th>
            <th>Stock Pack/Qty</th>
            <th>Cost Price</th>
            <th>Cost Value</th>
            <th>Sale Price</th>
            <th>Sale Value</th>
            <th>Profit Margin</th>
            <th>PM%</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              {/* <td>{index + 1}</td> */}
              <td>{item.itemName}</td>
              <td>{item.stock}</td>
              <td>{item.quantityInPack}</td>
              <td>{item.costPerPc}</td>
              <td>{item.stock * item.costPerPc}</td>
              <td>{item.retailPrice}</td>
              <td>{item.stock * item.retailPrice}</td>
              <td>{item.margin}</td>
              <td>
                {((item.retailPrice - item.costPerPc) / item.retailPrice) * 100}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockReport;
