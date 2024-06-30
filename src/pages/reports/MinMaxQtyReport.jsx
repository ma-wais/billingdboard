import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const MinMaxQtyReport = () => {
  return (
    <div className="box">
      <div className="heading">
        <p>MinMax Report</p>
      </div>
      <div className="inputs">
        <div className="row-inputs">
          <label htmlFor="report">Report for Items</label>
          <select name="report" id="report">
            <option value="min">Min</option>
            <option value="max">Max</option>
          </select>
        </div>
        <Select
          className="basic-single"
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={options}
          placeholder="Item"
        />
      </div>
      <div className="submit">
        <button>Search</button>
      </div>
    </div>
  );
};

export default MinMaxQtyReport;
