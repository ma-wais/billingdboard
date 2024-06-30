import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const ExpiryReport = () => {
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
          name="color"
          options={options}
          placeholder="Supplier"
        />
        <Select
          className="basic-single"
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={options}
          placeholder="Item"
        />
        <input type="number" placeholder="Expiry Days" />
      </div>
      <div className="submit">
        <button>Search</button>
      </div>
    </div>
  );
};

export default ExpiryReport;
