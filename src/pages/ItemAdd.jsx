import React from "react";

const ItemAdd = () => {
  return (
    <div className="box">
      <div className="heading">
        <p>Add Item</p>
      </div>
      <div className="inputs">
        <div className="row-inputs">
          <input type="text" placeholder="Item Code" />
          <input type="text" placeholder="Item Barcode" />
        </div>
        <div className="row-inputs">
          <input type="text" placeholder="Item Name" />
          <label htmlFor="type">Item Type </label>
          <select name="gender" id="type">
            {/* <option value="male">Male</option>
                    <option value="female">Female</option> */}
          </select>
        </div>
        <div className="row-inputs">
          <label htmlFor="companyName">Company Name</label>
          <select name="companyName" id="">
            <option value="">Active</option>
            <option value="">Left</option>
          </select>
          <label htmlFor="status">Unit</label>
          <select name="status" id="status">
            <option value="">TAB</option>
            <option value="">DROP</option>
          </select>
        </div>
        <div className="row-inputs">
          <input type="text" placeholder="Qty In Pack" />
          <input type="text" placeholder="Retail Price" />
        </div>
        <div className="row-inputs">
          <input type="text" placeholder="Minimum Quantity" />
          <input type="text" placeholder="Maximum Quantity" />
        </div>
        <div className="row-inputs">
          <label htmlFor="status">Active Status: </label>
          <select name="status" id="">
            <option value="">Active</option>
            <option value="">Left</option>
          </select>
          <input type="text" placeholder="Item Rack #" />
        </div>
        <div className="row-inputs" style={{maxWidth: "525px"}}>
          <label htmlFor="narcotic"> Narcotic </label>
          <input type="checkbox" name="narcotic" id="narcotic" />
          <input type="number" placeholder="Cost Per PC" />
        </div>
       <select name="Item Formula" id="formula">
          <option value="">Item Formula</option>
            <option value="ALFACALCIDOL">ALFACALCIDOL</option>
            <option value="ALPROZOLAM">
                ALPROZOLAM
            </option>
            <option value="AMANTADINE SULFATE">
                AMANTADINE SULFATE
            </option>
            <option value="AMLODIPINE">
                AMLODIPINE
            </option>
            <option value="AMLODIPINE HYDROCHLOROTHIAZIDE">
                AMLODIPINE HYDROCHLOROTHIAZIDE
            </option>
        </select>
        <textarea type="text" placeholder="Remarks" />
        <input type="file" accept="image/*" id="image" />
      </div>
      <div className="submit">
        <button>Save</button>
      </div>
    </div>
  );
};

export default ItemAdd;
