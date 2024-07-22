import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import Select from "react-select";

const ReceiptVoucher = () => {
  const [accounts, setAccounts] = useState([]);
  const [accountBalance, setAccountBalance] = useState({});
  const [formData, setFormData] = useState({
    date: "",
    account: "",
    amount: "",
    description: "",
    type: "CashReceipt", // Default to CashPayment
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountsResult = await axios.get(`${server}/accounts`);
        const items = accountsResult.data.map((item) => ({
          value: item._id,
          label: item.accountName,
          balance: item.balance
        }));
        setAccounts(items);
        console.log("Accounts fetched:", items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountChange = (selectedOption) => {
    setFormData({
      ...formData,
      account: selectedOption.value,
    });
    setAccountBalance(
      selectedOption.balance
    )
    console.log("Account selected:", selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${server}/accounts/cashvoucher`, {
        date: formData.date,
        account: formData.account,
        amount: parseFloat(formData.amount),
        description: formData.description,
        type: formData.type, // Send the type to the backend
      });

      setFormData({
        date: "",
        account: "",
        amount: "",
        description: "",
        type: "CashPayment", // Reset to default
      });
      alert("Receipt voucher created successfully!");
    } catch (error) {
      console.error("Error creating cash voucher:", error);
      alert("Error creating cash voucher. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Create Receipt Voucher</p>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="row-inputs">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="account">Account</label>
          <Select
            className="basic-single"
            isSearchable={true}
            // isClearable={true}
            options={accounts}
            name="account"
            placeholder="Account"
            onChange={handleAccountChange}
            required
          />
          <input
            type="number"
            readOnly
            style={{ padding: "7px" }}
            value={accountBalance}
          />
        </div>
        {/* <div className="row-inputs">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="CashPayment">Cash Payment</option>
            <option value="CashReceipt">Cash Receipt</option>
          </select>
        </div> */}
        <div className="row-inputs">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceiptVoucher;