import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { server } from "../../App";

const ItemReport = () => {
  const [itemUnit, setItemUnit] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [margin, setMargin] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [unitsRes, companiesRes] = await Promise.all([
          axios.get(`${server}/units`),
          axios.get(`${server}/companies`),
        ]);

        setItemUnit(
          unitsRes.data.map((type) => ({
            value: type.unitName,
            label: type.unitName,
          }))
        );
        setCompanies(
          companiesRes.data.map((company) => ({
            value: company.companyName,
            label: company.companyName,
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
      const response = await axios.get(`${server}/items`, {
        params: {
          companyName: selectedCompany?.value,
          unit: selectedUnit?.value,
          maxMargin: margin,
        },
      });
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Item Report</p>
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
          onChange={setSelectedCompany}
        />
        <Select
          className="basic-single"
          isClearable={true}
          classNamePrefix="custom-select"
          unstyled
          name="unit"
          options={itemUnit}
          placeholder="Unit"
          onChange={setSelectedUnit}
        />
        <input
          type="number"
          placeholder="Sale Margin"
          value={margin}
          onChange={(e) => setMargin(e.target.value)}
        />
      </div>
      <div className="submit">
        <button onClick={handleSearch}>Search</button>
      </div>
      {items.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Unit</th>
              <th>Company</th>
              <th>Qty In Pack</th>
              <th>Retail Price</th>
              <th>Sale Price</th>
              <th>Cost Price</th>
              <th>Margin</th>
              <th>Margin%</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.unit}</td>
                <td>{item.companyName}</td>
                <td>{item.quantityInPack}</td>
                <td>{item.retailPrice}</td>
                <td>{(item.retailPrice / item.quantityInPack).toFixed(2)}</td>
                <td>{item.costPerPc}</td>
                <td>{item.margin}</td>
                <td>{((item.margin / item.costPerPc) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ItemReport;
