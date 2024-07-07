import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import Select from "react-select";

const CashReport = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    account: "",
    type: "all",
  });

  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

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

  const handleChange = (e, meta) => {
    if (meta && meta.name === "account") {
      setFormData({ ...formData, account: e ? e.value : "" });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.account === "" || formData.account === null || formData.from === "" || formData.to === "") {
      alert("Please select all options");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.get(`${server}/accounts/cashreport`, {
        params: {
          dateFrom: formData.from,
          dateTo: formData.to,
          account: formData.account,
          type: formData.type,
        },
      });
      setReportData(res.data);
    } catch (error) {
      console.error("Error fetching cash report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Cash Report</p>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="row-inputs">
          <label htmlFor="from">From</label>
          <input
            type="date"
            name="from"
            placeholder="From"
            value={formData.from}
            onChange={handleChange}
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="to">To</label>
          <input
            type="date"
            name="to"
            placeholder="To"
            value={formData.to}
            onChange={handleChange}
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="account">Account</label>
          <Select
            className="basic-single"
            isSearchable={true}
            isClearable={true}
            options={accounts}
            name="account"
            placeholder="Account"
            onChange={(e) => handleChange(e, { name: "account" })}
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" value={formData.type} onChange={handleChange}>
            <option value="all">All</option>
            <option value="cash">Cash Payment</option>
            <option value="credit">Cash Receipt</option>
          </select>
        </div>
        <div className="submit">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </form>
      {reportData && (
        <table className="table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Date</th>
              <th>Account Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {reportData.report.map((item) => (
              <tr key={item.sr}>
                <td>{item.sr}</td>
                <td>{item.date}</td>
                <td>{item.accountTitle}</td>
                <td>{item.description}</td>
                <td>{item.type}</td>
                <td>{item.amount.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</td>
              <td style={{ fontWeight: 'bold' }}>{reportData.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CashReport;