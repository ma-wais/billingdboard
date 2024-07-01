import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const SaleReturnReport = () => {
  return (
    <div className="box">
      <div className="heading">
        <p>Sale Return Report</p>
      </div>
      <div className="inputs">
        <div className="row-inputs">
          <label htmlFor="from">From</label>
          <input type="date" name="from" id="from" />
        </div>
        <div className="row-inputs">
          <label htmlFor="to">To: </label>
          <input type="date" name="to" id="to" />
        </div>
        <Select
          className="basic-single"
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={options}
          placeholder="item"
        />
      </div>
      <div className="submit">
        <button>Search</button>
      </div>
    </div>
  );
};

export default SaleReturnReport;
