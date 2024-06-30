import React from "react";

const ItemLedger = () => {
  return (
    <div className="box">
      <div className="heading">
        <p>Item Ledger</p>
      </div>
      <div className="inputs">
        <input type="text" placeholder="Search" />
        <label htmlFor="from">From</label>
        <input type="date" name="from" id="from" />
        <label htmlFor="to">To</label>
        <input type="date" name="to" id="to" />
      </div>
      <div className="submit">
        <button>Search</button>
      </div>
    </div>
  );
};

export default ItemLedger;
