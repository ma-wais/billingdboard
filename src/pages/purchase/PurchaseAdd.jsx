import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { server } from "../../App";

const PurchaseAdd = () => {
  const [options, setOptions] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [currentPurchase, setCurrentPurchase] = useState({
    item: "",
    quantity: "",
    bonusQuantity: "",
    rate: "",
    total: "",
    quantityInPack: "",
    retail: "",
    pricePercentage: "",
    discountPercentage: "",
    discountAmount: "",
    priceAfterDiscount: "",
    taxPercentage: "",
    taxAmount: "",
    taxAmount2: "",
    netAmount: "",
    batchNumber: "",
    expiryDate: "",
    remarks: "",
  });
  const [summary, setSummary] = useState({
    totalItems: 0,
    billAmount: 0,
    discountPercentage: 0,
    discountAmount: 0,
    advanceTaxAmount: 0,
    netAmount: 0,
  });

  useEffect(() => {
    axios
      .get(`${server}/items`)
      .then((response) => {
        const items = response.data.map((item) => ({
          value: item._id,
          label: item.itemName,
          ...item,
        }));
        setOptions(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const handleSelectChange = (selectedOption) => {
    setCurrentPurchase({
      ...currentPurchase,
      item: selectedOption.label,
      quantityInPack: selectedOption.quantityInPack,
      retail: selectedOption.retailPrice,
      pricePercentage: selectedOption.margin,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPurchase({ ...currentPurchase, [name]: value });
  };

  const addToTable = () => {
    const newPurchases = [...purchases, currentPurchase];
    setPurchases(newPurchases);
    calculateSummary(newPurchases);
    setCurrentPurchase({
      item: "",
      quantity: "",
      bonusQuantity: "",
      rate: "",
      total: "",
      quantityInPack: "",
      retail: "",
      pricePercentage: "",
      discountPercentage: "",
      discountAmount: "",
      priceAfterDiscount: "",
      taxPercentage: "",
      taxAmount: "",
      taxAmount2: "",
      netAmount: "",
      batchNumber: "",
      expiryDate: "",
      remarks: "",
    });
  };

  const calculateSummary = (purchases) => {
    const totalItems = purchases.length;
    const billAmount = purchases.reduce(
      (sum, purchase) =>
        sum + parseFloat(purchase.rate) * parseFloat(purchase.quantity),
      0
    );
    const discountAmount = purchases.reduce(
      (sum, purchase) => sum + parseFloat(purchase.discountAmount),
      0
    );
    const advanceTaxAmount = purchases.reduce(
      (sum, purchase) => sum + parseFloat(purchase.taxAmount),
      0
    );
    const netAmount = billAmount - discountAmount + advanceTaxAmount;

    setSummary({
      totalItems,
      billAmount,
      discountPercentage: 0, // Calculate based on your logic
      discountAmount,
      advanceTaxAmount,
      netAmount,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      supplier: "Sample Supplier", // Change as per your input fields
      dateOfPurchase: new Date(),
      billNumber: "12345",
      paymentMode: "Cash",
      purchases,
      ...summary,
    };

    axios
      .post(`${server}/purchase`, payload)
      .then((response) => {
        console.log("Purchase added:", response.data);
        // Reset form or show success message
      })
      .catch((error) => {
        console.error("Error adding purchase:", error);
        // Show error message
      });
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Purchase</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="row-inputs">
            <label htmlFor="supplier">Supplier:</label>
            <select name="supplier" id="supplier">
              <option value=""></option>
              <option value="Sample Supplier">Sample Supplier</option>
            </select>
            <label htmlFor="dateOfPurchase">Date of Purchase:</label>
            <input
              style={{ width: "195px" }}
              type="date"
              name="dateOfPurchase"
              id="dateOfPurchase"
            />
          </div>
          <div className="row-inputs">
            <input
              type="text"
              name="billNumber"
              placeholder="Bill #"
              onChange={handleInputChange}
            />
            <label htmlFor="paymentMode">Payment Mode:</label>
            <select name="paymentMode" id="paymentMode">
              <option value=""></option>
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          <textarea
            name="remarks"
            placeholder="Remarks"
            onChange={handleInputChange}
          />
        </div>
        <div className="inputs more">
          <div className="more-inputs">
            <Select
              className="basic-single"
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="item"
              options={options}
              placeholder="Item"
              onChange={handleSelectChange}
            />
            <input
              className="w50"
              type="number"
              name="quantity"
              placeholder="Quantity"
              onChange={handleInputChange}
            />
            <input
              className="w50"
              type="number"
              name="bonusQuantity"
              placeholder="Bonus Qty"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="rate"
              placeholder="Rate (Purchase Price)"
              onChange={handleInputChange}
            />
            <input
              className="w50"
              type="number"
              name="total"
              placeholder="Total"
              onChange={handleInputChange}
            />
            <input
              className="w50"
              type="number"
              name="quantityInPack"
              placeholder="QtyInPack"
              value={currentPurchase.quantityInPack}
              readOnly
            />
            <input
              className="w50"
              type="number"
              name="retail"
              placeholder="Retail"
              value={currentPurchase.retail}
              readOnly
            />
            <input
              className="w50"
              type="number"
              name="pricePercentage"
              placeholder="Price %"
              value={currentPurchase.pricePercentage}
              readOnly
            />
            <input
              type="number"
              name="discountPercentage"
              placeholder="Discount %"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="discountAmount"
              placeholder="Discount Amount"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="priceAfterDiscount"
              placeholder="Price after Discount"
              onChange={handleInputChange}
            />
            <input
              className="w50"
              type="number"
              name="taxPercentage"
              placeholder="Tax %"
              onChange={handleInputChange}
            />
            <input
              className="w50"
              type="number"
              name="taxAmount"
              placeholder="Tax Amount"
              onChange={handleInputChange}
            />
            <input
              className="w50"
              type="number"
              name="taxAmount2"
              placeholder="Tax Amount2"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="netAmount"
              placeholder="Net Amount"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="batchNumber"
              placeholder="Batch #"
              onChange={handleInputChange}
            />
            <div className="row-inputs" style={{ width: "200px" }}>
              <label htmlFor="expiry">Expiry Date:</label>
              <input
                type="date"
                name="expiryDate"
                id="expiry"
                onChange={handleInputChange}
              />
            </div>
            <textarea
              name="remarks"
              style={{ width: "60%", height: "30px" }}
              placeholder="Remarks"
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={addToTable}
              style={{
                background: "#739e73",
                color: "white",
                marginLeft: "auto",
                marginRight: "10px",
              }}
            >
              Add To Table
            </button>
          </div>
        </div>
        <div className="inputs more"  style={{ minWidth: "700px", overflowX: "scroll" }}>
        {/* Table for displaying purchases */}
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Bonus</th>
              <th>P.P</th>
              <th>Price %</th>
              <th>Dis.%</th>
              <th>Disc.Amount</th>
              <th>Pr.After.Disc</th>
              <th>Tax%</th>
              <th>Tax Amt</th>
              <th>Tax Amt2</th>
              <th>Net</th>
              <th>Retail</th>
              <th>Batch</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.item}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.bonusQuantity}</td>
                <td>{purchase.total}</td>
                <td>{purchase.pricePercentage}</td>
                <td>{purchase.discountPercentage}</td>
                <td>{purchase.discountAmount}</td>
                <td>{purchase.priceAfterDiscount}</td>
                <td>{purchase.taxPercentage}</td>
                <td>{purchase.taxAmount}</td>
                <td>{purchase.taxAmount2}</td>
                <td>{purchase.netAmount}</td>
                <td>{purchase.retail}</td>
                <td>{purchase.batchNumber}</td>
                <td>{purchase.expiryDate}</td>
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

export default PurchaseAdd;
