import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const ReceiptVoucherEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accounts, setAccounts] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);
  const [formData, setFormData] = useState({
    date: "",
    account: "",
    amount: "",
    description: "",
    type: "CashPayment",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsResult, voucherResult] = await Promise.all([
          axios.get(`${server}/accounts`),
          axios.get(`${server}/accounts/cashvoucher/${id}`)
        ]);

        setAccounts(accountsResult.data.map(item => ({
          value: item._id,
          label: item.accountName,
          balance: item.balance
        })));

        setFormData({
          date: voucherResult.data.date,
          account: voucherResult.data.account.accountName,
          amount: voucherResult.data.amount,
          description: voucherResult.data.description,
          type: "RecieptPayment",
        });
        setAccountBalance(voucherResult.data.account.balance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      account: selectedOption.value,
    }));
    setAccountBalance(selectedOption.balance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`${server}/accounts/cashvoucher/${id}`, {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      navigate("/voucher-list");
    } catch (error) {
      console.error("Error updating cash voucher:", error);
      alert("Error updating cash voucher. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Edit Receipt Voucher</p>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="row-inputs">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="row-inputs">
          <label htmlFor="account">Account</label>
          <Select
            options={accounts}
            name="account"
            placeholder="Account"
            onChange={handleAccountChange}
            required
          />
          <input type="number" readOnly style={{ padding: "7px" }} value={accountBalance} />
        </div>
        <div className="row-inputs">
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div className="row-inputs">
          <label htmlFor="description">Description</label>
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
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

export default ReceiptVoucherEdit;