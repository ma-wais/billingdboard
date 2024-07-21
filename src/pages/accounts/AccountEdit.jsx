import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../App";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const EditAccount = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [cities, setCities] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountType: "",
    accountCode: "",
    accountName: "",
    phone: "",
    email: "",
    status: "",
    city: "",
    address: "",
    remarks: "",
    openingDebit: 0,
    closingCredit: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResult, accountResult] = await Promise.all([
          axios.get(`${server}/cities`),
          axios.get(`${server}/accounts/${id}`),
        ]);
        const items = citiesResult.data.map((item) => ({
          value: item.name,
          label: item.name,
          ...item,
        }));
        setCities(items);
        setAccounts(accountResult.data);
        setFormData(accountResult.data);
        console.log("Data fetched:", accountResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${server}/accounts/${id}`, formData);
      navigate("/add-account");
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error editing account. Please try again.");
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Edit Account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="row-inputs">
            <label htmlFor="accountType"> Account Type:</label>
            <select
              name="accountType"
              id="accountType"
              onChange={handleChange}
              defaultValue={accounts.accountType}
            >
              <option value="">Select</option>
              <option value="Customer">Customer</option>
              <option value="Supplier">Supplier</option>
              <option value="Expenses">Expenses</option>
              <option value="Trading">Trading</option>
            </select>
            <input
              type="text"
              placeholder="Account Code:"
              name="accountCode"
              onChange={handleChange}
              defaultValue={accounts.accountCode}
            />
          </div>
          <input
            type="text"
            placeholder="Account Name"
            name="accountName"
            onChange={handleChange}
            defaultValue={accounts.accountName}
          />
          <div className="row-inputs">
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              defaultValue={accounts.phone}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              defaultValue={accounts.email}
            />
          </div>
          <div className="row-inputs">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              onChange={handleChange}
              defaultValue={accounts.status}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <Select
              className="basic-single"
              isSearchable={true}
              isClearable={true}
              options={cities.map((city) => ({
                value: city._id,
                label: city.name,
              }))}
              name="city"
              placeholder="City"
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  city: selectedOption ? selectedOption.value : "",
                })
              }
              defaultdefaultValue={accounts?.city?.name}
            />
          </div>
          <textarea
            type="text"
            placeholder="Address"
            name="address"
            onChange={handleChange}
            defaultValue={accounts.address}
          />
          <textarea
            type="text"
            placeholder="Remarks"
            name="remarks"
            onChange={handleChange}
            defaultValue={accounts.remarks}
          />
          <div className="row-inputs">
            <label htmlFor="openingDebit"> Opening Credit</label>
            <input
              type="number"
              placeholder="Opening Debit"
              name="openingDebit"
              onChange={handleChange}
              defaultValue={accounts.openingDebit}
            />
            <label htmlFor="closingCredit"> Closing Credit</label>
            <input
              type="number"
              placeholder="Closing Credit"
              name="closingCredit"
              onChange={handleChange}
              defaultValue={accounts.closingCredit}
            />
          </div>
        </div>
        <div className="submit">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
