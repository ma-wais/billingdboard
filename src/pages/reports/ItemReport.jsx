import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ItemReport = () => {
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className="box">
      <div className="heading">
        <p>Item Report</p>
      </div>
      <div className="inputs">
        <Select
          className="basic-single"
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={options}
          placeholder="Company"
        />
        <Select
          className="basic-single"
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={options}
          placeholder="Unit"
        />
        <input type="number" placeholder="Sale Margin" />
      </div>
      <div className="submit">
        <button>Search</button>
      </div>
    </div>
  );
};

export default ItemReport;
