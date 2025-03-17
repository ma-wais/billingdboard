import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { server } from "../../App";

const MinMaxQtyReport = () => {
  const [items, setItems] = useState([]);
  const [reportType, setReportType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);

  // Fetch the items for the dropdown
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

  // Fetch data based on filters
  const fetchTableData = async () => {
    try {
      const params = {};
      if (reportType) params.stockType = reportType;
      if (selectedItem) params.itemName = selectedItem.value;

      const response = await axios.get(`${server}/items`, { params });

      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  // Handle the submit button click
  const handleSearch = () => {
    fetchTableData();
  };

  return (
    <div className="box">
      <div className="heading">
        <p>MinMax Report</p>
      </div>
      <div className="inputs">
        <div className="row-inputs">
          <label htmlFor="report">Report for Items</label>
          <select
            name="report"
            id="report"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="">All</option>
            <option value="low">low</option>
            <option value="high">high</option>
          </select>
        </div>
        <Select
          className="basic-single"
          classNamePrefix="custom-select"
          unstyled
          isClearable={true}
          name="item"
          options={items}
          placeholder="Item"
          value={selectedItem}
          onChange={(selectedOption) => setSelectedItem(selectedOption)}
        />
      </div>
      <div className="submit">
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Unit</th>
            <th>Min Qty</th>
            <th>Max Qty</th>
            <th>Remaining Qty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan="7">No data found</td>
            </tr>
          ) : (
            tableData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.unit}</td>
                <td>{item.minimumQuantity}</td>
                <td>{item.maximumQuantity}</td>
                <td>{item.stock}</td>
                <td>{item.stockType}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MinMaxQtyReport;
