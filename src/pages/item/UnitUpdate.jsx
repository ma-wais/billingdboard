import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const UnitUpdate = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [newUnit, setNewUnit] = useState({
    unitName: "",
    unitStatus: "active",
    remarks: "",
  });

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(`${server}/units/${id}`);
        setNewUnit(response.data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUnit({ ...newUnit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${server}/units/${id}`, newUnit);
      navigate("/unit");
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Unit</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Unit Name"
            name="unitName"
            value={newUnit.unitName}
            onChange={handleInputChange}
            required
          />
          <div className="row-inputs">
            <label htmlFor="unitStatus">Unit Status</label>
            <select
              name="unitStatus"
              value={newUnit.unitStatus}
              onChange={handleInputChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={newUnit.remarks}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="submit">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default UnitUpdate;
