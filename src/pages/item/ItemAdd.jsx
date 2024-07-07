import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { server } from "../../App";

const ItemAdd = () => {
  const [units, setUnits] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    itemCode: "",
    itemBarCode: "",
    itemName: "",
    itemType: "",
    companyName: "",
    unit: "",
    quantityInPack: "",
    retailPrice: "",
    minimumQuantity: "",
    maximumQuantity: "",
    status: "Active",
    itemRackNumber: "",
    narcotics: false,
    costPerPc: "",
    itemFormula: "",
    remarks: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitsRes, itemTypesRes, companiesRes] = await Promise.all([
          axios.get(`${server}/units`),
          axios.get(`${server}/item-types`),
          axios.get(`${server}/companies`),
        ]);

        setUnits(
          unitsRes.data.map((unit) => ({
            value: unit.unitName,
            label: unit.unitName,
          }))
        );
        setItemTypes(
          itemTypesRes.data.map((type) => ({
            value: type.itemTypeName,
            label: type.itemTypeName,
          }))
        );
        setCompanies(
          companiesRes.data.map((company) => ({
            value: company.companyName,
            label: company.companyName,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        `${server}/items`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData({
        itemCode: "",
        itemBarCode: "",
        itemName: "",
        itemType: "",
        companyName: "",
        unit: "",
        quantityInPack: "",
        retailPrice: "",
        minimumQuantity: "",
        maximumQuantity: "",
        status: "Active",
        itemRackNumber: "",
        narcotics: false,
        costPerPc: "",
        itemFormula: "",
        remarks: "",
        image: null,
      })
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Item</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="row-inputs">
            <input
              type="text"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleInputChange}
              placeholder="Item Code"
            />
            <input
              type="text"
              name="itemBarCode"
              value={formData.itemBarCode}
              onChange={handleInputChange}
              placeholder="Item Barcode"
            />
          </div>
          <div className="row-inputs">
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="Item Name"
            />
            <label htmlFor="itemType">Item Type </label>
            <Select
              className="basic-single"
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="itemType"
              options={itemTypes}
              placeholder="Item Type"
              onChange={(option) =>
                handleSelectChange(option, { name: "itemType" })
              }
            />
          </div>
          <div className="row-inputs">
            <label htmlFor="companyName">Company Name</label>
            <Select
              className="basic-single"
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="companyName"
              options={companies}
              placeholder="Company Name"
              onChange={(option) =>
                handleSelectChange(option, { name: "companyName" })
              }
            />
            <label htmlFor="unit">Unit</label>
            <Select
              className="basic-single"
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="unit"
              options={units}
              placeholder="Unit"
              onChange={(option) =>
                handleSelectChange(option, { name: "unit" })
              }
            />
          </div>
          <div className="row-inputs">
            <input
              type="number"
              name="quantityInPack"
              value={formData.quantityInPack}
              onChange={handleInputChange}
              placeholder="Qty In Pack"
            />
            <input
              type="number"
              name="retailPrice"
              value={formData.retailPrice}
              onChange={handleInputChange}
              placeholder="Retail Price"
            />
          </div>
          <div className="row-inputs">
            <input
              type="number"
              name="minimumQuantity"
              value={formData.minimumQuantity}
              onChange={handleInputChange}
              placeholder="Minimum Quantity"
            />
            <input
              type="number"
              name="maximumQuantity"
              value={formData.maximumQuantity}
              onChange={handleInputChange}
              placeholder="Maximum Quantity"
            />
          </div>
          <div className="row-inputs">
            <label htmlFor="status">Active Status: </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Left">Left</option>
            </select>
            <input
              type="text"
              name="itemRackNumber"
              value={formData.itemRackNumber}
              onChange={handleInputChange}
              placeholder="Item Rack #"
            />
          </div>
          <div className="row-inputs" style={{ maxWidth: "525px" }}>
            <label htmlFor="narcotics"> Narcotic </label>
            <input
              type="checkbox"
              name="narcotics"
              checked={formData.narcotics}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="costPerPc"
              value={formData.costPerPc}
              onChange={handleInputChange}
              placeholder="Cost Per PC"
            />
          </div>
          <select
            name="itemFormula"
            value={formData.itemFormula}
            onChange={handleInputChange}
          >
            <option value="">Item Formula</option>
            <option value="ALFACALCIDOL">ALFACALCIDOL</option>
            <option value="ALPROZOLAM">ALPROZOLAM</option>
            <option value="AMANTADINE SULFATE">AMANTADINE SULFATE</option>
            <option value="AMLODIPINE">AMLODIPINE</option>
            <option value="AMLODIPINE HYDROCHLOROTHIAZIDE">
              AMLODIPINE HYDROCHLOROTHIAZIDE
            </option>
          </select>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            placeholder="Remarks"
          />
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: e.target.files[0] || null,
              }))
            }
          />{" "}
        </div>
        <div className="submit">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ItemAdd;
