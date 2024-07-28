import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { server } from "../../App";

const ItemAdd = () => {
  const [units, setUnits] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formulas, setFormulas] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [currentSupplier, setCurrentSupplier] = useState('');
  const [currentRemarks, setCurrentRemarks] = useState('');
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
        const [unitsRes, itemTypesRes, companiesRes, suppliersRes, formulasRes] =
          await Promise.all([
            axios.get(`${server}/units`),
            axios.get(`${server}/item-types`),
            axios.get(`${server}/companies`),
            axios.get(`${server}/accounts`),
            axios.get(`${server}/formula`),
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
        setSuppliers(
          suppliersRes.data.map((supplier) => ({
            value: supplier.accountName,
            label: supplier.accountName,
          }))
        );
        setFormulas(
          formulasRes.data.map((formula) => ({
            value: formula.name,
            label: formula.name,
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

  const handleSupplierList = (e) => {
    e.preventDefault();
    if (currentSupplier && currentRemarks) {
      setSupplierList([...supplierList, { name: currentSupplier, remarks: currentRemarks }]);
      setCurrentSupplier('');
      setCurrentRemarks('');
    } else {
      alert('Please select a supplier and enter remarks.');
    }
  };

  const handleSupplierChange = (selectedOption) => {
    setCurrentSupplier(selectedOption ? selectedOption.value : '');
  };

  const handleRemarksChange = (e) => {
    setCurrentRemarks(e.target.value);
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
  
    // Ensure supplierList is correctly serialized
    formDataToSend.append("supplierList", JSON.stringify(supplierList));
  
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    try {
      const response = await axios.post(`${server}/items`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      });
      setSupplierList([]);
      alert("Item created successfully!");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleDeleteSupplier = (index) => {
    const newSupplierList = [...supplierList];
    newSupplierList.splice(index, 1);
    setSupplierList(newSupplierList);
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
          <Select
            className="basic-single"
            isLoading={false}
            isClearable={true}
            isSearchable={true}
            name="itemFormula"
            options={formulas}
            placeholder="Item Formula"
            onChange={(option) =>
              handleSelectChange(option, { name: "itemFormula" })
            }
          />
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

        <div className="heading2">
          <p>Add Item Suppliers</p>
        </div>

        <div className="inputs" style={{ flexDirection: 'row' }}>
        <Select
          className="basic-single"
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="supplierName"
          options={suppliers}
          placeholder="Supplier Name"
          onChange={handleSupplierChange}
          value={suppliers.find((sup) => sup.value === currentSupplier)}
        />
        <textarea
        style={{ width: '30%', height: '40px' }}
          name="supplierRemarks"
          value={currentRemarks}
          onChange={handleRemarksChange}
          placeholder="Supplier Remarks"
        />
        <button onClick={handleSupplierList} style={{ marginLeft: 'auto' }}>
          Add to table
        </button>
        </div>
        <div className="inputs more">
          <table>
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Remarks</th>
                <td style={{ width: "3%" }}>Action</td>
              </tr>
            </thead>
            <tbody>
            {supplierList.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.name}</td>
                  <td>{supplier.remarks}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteSupplier(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="submit">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ItemAdd;
