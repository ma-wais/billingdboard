import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import Select from "react-select";

const AccountLedger = () => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    account: "",
  });
  const [ledgerData, setLedgerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = (selectedOption, actionMeta) => {
    if (actionMeta.name === "account") {
      setFormData({
        ...formData,
        account: selectedOption ? selectedOption.value : "",
      });
    } else {
      const { name, value } = selectedOption.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.get(`${server}/accounts/ledger`, {
        params: {
          accountId: formData.account,
          dateFrom: formData.from,
          dateTo: formData.to,
        },
      });
      setLedgerData(res.data);
    } catch (error) {
      console.error("Error fetching ledger data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Account Ledger</p>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="row-inputs">
          <label htmlFor="account">Account</label>
          <Select
            className="basic-single"
            classNamePrefix="custom-select"
            unstyled
            isClearable={true}
            options={accounts}
            name="account"
            placeholder="Account"
            onChange={handleChange}
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="from">From Date</label>
          <input
            type="date"
            name="from"
            placeholder="from"
            value={formData.from}
            onChange={handleInputChange}
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="to">To Date</label>
          <input
            type="date"
            name="to"
            placeholder="to"
            value={formData.to}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Generate Ledger"}
          </button>
        </div>
      </form>

      {ledgerData && (
        <div className="ledger-table">
          <h3>{ledgerData.accountTitle} - Ledger</h3>
          <p>
            From: {ledgerData.dateFrom} To: {ledgerData.dateTo}
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Date</th>
                <th>Type</th>
                <th>Narration</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6">Opening Balance:</td>
                <td>{ledgerData.openingBalance.toFixed(2)}</td>
              </tr>
              {ledgerData.transactions.map((transaction) => (
                <tr key={transaction.sr}>
                  <td>{transaction.sr}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.narration}</td>
                  <td>{transaction.debit.toFixed(2)}</td>
                  <td>{transaction.credit.toFixed(2)}</td>
                  <td>{transaction.balance.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">Period Total</td>
                <td>
                  {ledgerData.transactions
                    .reduce((sum, t) => sum + t.debit, 0)
                    .toFixed(2)}
                </td>
                <td>
                  {ledgerData.transactions
                    .reduce((sum, t) => sum + t.credit, 0)
                    .toFixed(2)}
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="6">Closing Balance</td>
                <td>{ledgerData.closingBalance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccountLedger;
