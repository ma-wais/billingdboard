import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const CompanyEdit = () => {
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    shortName: "",
    code: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    status: "Active",
    remarks: "",
  });
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [citiesResponse, companiesResponse] = await Promise.all([
          axios.get(`${server}/cities`),
          axios.get(`${server}/companies/${id}`),
        ]);

        const formattedCities = citiesResponse.data.map((item) => ({
          value: item.name,
          label: item.name,
          ...item,
        }));

        setFormData(companiesResponse.data);

        setCities(formattedCities);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(`${server}/companies/${id}`, formData);
      navigate("/company");
      setLoading(false);
    } catch (error) {
      console.error("Error saving company:", error);
      setLoading(false);
    }
  };
  return (
    <div className="box">
      <div className="heading">
        <p>Edit Company</p>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />
        <div className="row-inputs">
          <input
            type="text"
            name="shortName"
            placeholder="Short Name"
            value={formData.shortName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="code"
            placeholder="Code"
            value={formData.code}
            onChange={handleChange}
          />
        </div>
        <div className="row-inputs">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone #"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="row-inputs">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <Select
                className="basic-single"
                classNamePrefix="custom-select"
                placeholder="City"
                unstyled
                options={cities}
                value={formData.city}
                onChange={(value) => setFormData({ ...formData, city: value })}
              />
            </div>
            <textarea
              rows={1}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <textarea
              type="text"
              name="remarks"
              placeholder="Remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
        <div className="submit">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#f8f9fa", // Light gray background
    borderColor: state.isFocused ? "#007bff" : "#ced4da", // Blue border on focus
    boxShadow: state.isFocused ? "0 0 5px rgba(0, 123, 255, 0.5)" : "none",
    "&:hover": {
      borderColor: "#007bff",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff",
    border: "1px solid #ced4da",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
      ? "#e9ecef"
      : "white",
    color: state.isSelected ? "white" : "black",
    padding: 10,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#007bff",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#495057",
    fontWeight: "bold",
  }),
};

export default CompanyEdit;
