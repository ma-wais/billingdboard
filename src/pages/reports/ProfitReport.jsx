import React from "react";

const ProfitReport = () => {
  return (
    <div className="box">
      <div className="heading">
        <p>Profit Report</p>
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
      </div>
      <div className="submit">
        <button>Search</button>
      </div>
    </div>
  );
};

export default ProfitReport;
