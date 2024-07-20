import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const EmployeeEdit = () => {
  const params = useParams();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeCode: "",
    employeeName: "",
    fatherName: "",
    cnic: "",
    gender: "",
    dateOfBirth: "",
    status: "",
    address: "",
    city: "",
    remarks: "",
    image: null,
  });

  const navigate = useNavigate();
  const id = params.id;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${server}/employees/${id}`);
        const employeeData = response.data;

        if (employeeData.dateOfBirth) {
            const date = new Date(employeeData.dateOfBirth);
            employeeData.dateOfBirth = date.toISOString().split('T')[0];
          }
          
          setFormData({
            employeeCode: employeeData.employeeCode,
            employeeName: employeeData.name,
            fatherName: employeeData.fatherName,
            cnic: employeeData.cnic,
            gender: employeeData.gender,
            dateOfBirth: employeeData.dateOfBirth,
            status: employeeData.status,
            address: employeeData.address,
            city: employeeData.city,
            remarks: employeeData.remarks,
            image: null,
          });
          
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
  
    fetchEmployee();
  }, [id]);

  useEffect(() => {
    axios.get(`${server}/cities`).then((response) => {
      const items = response.data.map((item) => ({
        value: item.name,
        label: item.name,
        ...item,
      }));
      setCities(items);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      setLoading(true);
      await axios.put(`${server}/employees/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      navigate("/employ");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="box">
      <div className="heading">
        <p>Edit Employee</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Employee code (Password)"
            name="employeeCode"
            value={formData.employeeCode}
            onChange={handleChange}
          />
          <div className="row-inputs">
            <input
              type="text"
              placeholder="Name"
              name="employeeName"
              onChange={handleChange}
              value={formData.employeeName}
            />
            <input
              type="text"
              placeholder="Father Name"
              name="fatherName"
              onChange={handleChange}
              value={formData.fatherName}
            />
          </div>
          <div className="row-inputs">
            <label htmlFor="gender"> Gender: </label>
            <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label htmlFor="dob"> Date of Birth: </label>
            <input
              style={{ width: "195px" }}
              type="date"
              name="dateOfBirth"
              id="dob"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="row-inputs">
            <input
              type="text"
              placeholder="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
            />
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Left">Left</option>
            </select>
          </div>
          <div className="row-inputs">
            <textarea
              style={{ width: "40%", height: "33px" }}
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Select
              name="city"
              isSearchable={true}
              placeholder="Select City"
              // isClearable= {true}
              value={cities.find((city) => city.value === formData.city)}
              className="basic-single"
              options={cities}
              onChange={(e) => {
                setFormData({ ...formData, city: e.value });
              }}
            />
          </div>
          <textarea
            type="text"
            placeholder="Remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className="submit">
          <button type="submit">{loading ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
