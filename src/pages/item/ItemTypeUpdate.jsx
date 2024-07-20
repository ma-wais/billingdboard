import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const ItemTypeUpdate = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  
  const [formData, setFormData] = useState({
    itemTypeName: "",
    itemTypeShortName: "",
    itemTypeActive: "",
    itemTypeRemarks: "",
  });

  useEffect(() => {
    axios
      .get(`${server}/item-types/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the item types!", error);
      });
  }, []);

  const handleSave = () => {
    axios
      .put(`${server}/item-types/${id}`, formData)
      .catch((error) => {
        console.error("There was an error saving the item type!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Update Item Type</p>
      </div>
      <div className="inputs">
        <input
          type="text"
          name="itemTypeName"
          placeholder="Item Type Name"
          value={formData.itemTypeName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="itemTypeShortName"
          placeholder="Item Type Short Name"
          value={formData.itemTypeShortName}
          onChange={handleChange}
        />
        <div className="row-inputs">
          <label htmlFor="itemTypeActive">Item Type Active</label>
          <select
            name="itemTypeActive"
            id="itemTypeActive"
            value={formData.itemTypeActive}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <textarea
          name="itemTypeRemarks"
          id="remarks"
          placeholder="Remarks"
          value={formData.itemTypeRemarks}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="submit">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ItemTypeUpdate;
