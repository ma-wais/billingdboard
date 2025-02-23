import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { server } from "../../App";
import { CgClose } from "react-icons/cg";

const PurchaseAdd = () => {
  const [accounts, setAccounts] = useState([]);
  const [options, setOptions] = useState([]);
  const [account, setAccount] = useState(0);

  const [purchases, setPurchases] = useState([]);
  const [dateOfPurchase, setDateOfPurchase] = useState(new Date());
  const [billNumber, setBillNumber] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [remarks, setRemarks] = useState("");
  const [currentPurchase, setCurrentPurchase] = useState({
    item: "",
    quantity: 0,
    bonusQuantity: 0,
    rate: 0,
    total: 0,
    quantityInPack: 0,
    retail: 0,
    pricePercentage: 100,
    discountPercentage: 0,
    discountAmount: 0,
    priceAfterDiscount: 0,
    taxPercentage: 0,
    taxAmount: 0,
    netAmount: 0,
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
    (async () => {
      try {
        const [accountsResult, itemsResult] = await Promise.all([
          axios.get(`${server}/accounts`),
          axios.get(`${server}/items`),
        ]);

        setAccounts(
          accountsResult.data.map((item) => ({
            value: item.accountName,
            label: item.accountName,
          }))
        );
        setOptions(
          itemsResult.data.map((item) => ({
            value: item._id,
            label: item.itemName,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedPurchase = { ...currentPurchase, [name]: value };

    const quantity = parseFloat(updatedPurchase.quantity) || 0;
    const rate = parseFloat(updatedPurchase.rate) || 0;
    const retail = parseFloat(updatedPurchase.retail) || 0;
    const discountPercentage =
      parseFloat(updatedPurchase.discountPercentage) || 0;
    const discountAmount = parseFloat(updatedPurchase.discountAmount) || 0;
    const taxPercentage = parseFloat(updatedPurchase.taxPercentage) || 0;
    let total = parseFloat(updatedPurchase.total) || 0;

    switch (name) {
      case "quantity":
        total = (quantity * rate).toFixed(2);
        updatedPurchase.total = total;
        break;
      case "rate":
        total = (quantity * rate).toFixed(2);
        updatedPurchase.total = total;
        if (retail > 0) {
          updatedPurchase.pricePercentage = ((retail - rate) / rate * 100).toFixed(2);
        }
        break;
      case "retail":
        if (rate > 0) {
          updatedPurchase.pricePercentage = ((retail - rate) / rate * 100).toFixed(2);
        }
        break;
      case "discountPercentage":
        updatedPurchase.discountAmount = (
          total *
          (discountPercentage / 100)
        ).toFixed(2);
        break;
      case "discountAmount":
        updatedPurchase.discountPercentage = (
          (discountAmount / total) *
          100
        ).toFixed(2);
        break;
      case "taxPercentage":
        const totalAfterDiscount = total - discountAmount;
        updatedPurchase.taxAmount = (
          totalAfterDiscount *
          (taxPercentage / 100)
        ).toFixed(2);
        break;
      case "taxAmount":
        updatedPurchase.taxPercentage = (
          (parseFloat(updatedPurchase.taxAmount) / total) *
          100
        ).toFixed(2);
        break;
      default:
        break;
    }

    const totalAfterDiscount = total - discountAmount;

    const taxAmount = parseFloat(updatedPurchase.taxAmount) || 0;
    updatedPurchase.netAmount = (totalAfterDiscount + taxAmount).toFixed(2);
    updatedPurchase.priceAfterDiscount = totalAfterDiscount.toFixed(2);
    setCurrentPurchase(updatedPurchase);
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
      netAmount: "",
      batchNumber: "",
      expiryDate: "",
      remarks: "",
    });
  };

  const removeFromTable = (indexToRemove) => {
    const newPurchases = purchases.filter(
      (_, index) => index !== indexToRemove
    );
    setPurchases(newPurchases);
    calculateSummary(newPurchases);
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
      discountPercentage: 0,
      discountAmount,
      advanceTaxAmount,
      netAmount,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      supplier: account,
      dateOfPurchase: dateOfPurchase,
      billNumber: billNumber,
      paymentMode: paymentMode,
      remarks: remarks,
      purchases,
      ...summary,
    };

    axios.post(`${server}/purchase/return`, payload).catch((error) => {
      console.error("Error adding purchase:", error);
    });
    setPurchases([]);
    alert("Purchase added successfully");
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Purchase</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="row-inputs">
            <Select
              className="basic-single"
              classNamePrefix="custom-select"
              unstyled
              isClearable={true}
              options={accounts}
              placeholder="Account"
              onChange={(e) => {
                setAccount(e ? e.value : "");
              }}
            />
            <div>
              <label htmlFor="dateOfPurchase">Date of Purchase:</label>
              <input
                style={{ width: "195px" }}
                type="date"
                name="dateOfPurchase"
                id="dateOfPurchase"
                onChange={(e) => {
                  setDateOfPurchase(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row-inputs">
            <input
              type="text"
              name="billNumber"
              placeholder="Bill #"
              onChange={(e) => setBillNumber(e.target.value)}
            />
            <label htmlFor="paymentMode">Payment Mode:</label>
            <select
              name="paymentMode"
              id="paymentMode"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value=""></option>
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          <textarea
            name="remarks"
            placeholder="Remarks"
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <div className="inputs more">
          <div className="more-inputs">
            <Select
              className="basic-single"
              classNamePrefix="custom-select"
              unstyled
              options={options}
              placeholder="Item"
              onChange={(e) => {
                setCurrentPurchase((prev) => ({
                  ...prev,
                  item: e ? e.value : "",
                }));
              }}
            />

            <div>
              <label htmlFor="quantity"> Quantity:</label>
              <input
                className="w50"
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={currentPurchase.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="bonusQuantity"> Bonus Qty:</label>
              <input
                className="w50"
                type="number"
                name="bonusQuantity"
                placeholder="Bonus Qty"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="rate"> Rate:</label>
              <input
                className="w50"
                type="number"
                name="rate"
                placeholder="Rate (Purchase Price)"
                value={currentPurchase.rate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="total"> Total</label>
              <input
                className="w50"
                type="number"
                name="total"
                placeholder="Total"
                value={currentPurchase.total}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="quantityInPack"> QtyInPack:</label>
              <input
                className="w50"
                type="number"
                name="quantityInPack"
                placeholder="QtyInPack"
                value={currentPurchase.quantityInPack}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="retail"> Retail:</label>
              <input
                className="w50"
                type="number"
                name="retail"
                placeholder="Retail"
                value={currentPurchase.retail}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="pricePercentage"> Price %:</label>
              <input
                className="w50"
                type="number"
                name="pricePercentage"
                placeholder="Price %"
                defaultValue={100}
                value={currentPurchase.pricePercentage}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="discountPercentage"> Discount %:</label>
              <input
                className="w50"
                type="number"
                name="discountPercentage"
                placeholder="Discount %"
                value={currentPurchase.discountPercentage}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="discountAmount"> Discount Amount:</label>
              <input
                className="w50"
                type="number"
                name="discountAmount"
                placeholder="Discount Amount"
                value={currentPurchase.discountAmount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="priceAfterDiscount"> Price After Discount:</label>
              <input
                className="w50"
                type="number"
                name="priceAfterDiscount"
                placeholder="Price after Discount"
                value={currentPurchase.priceAfterDiscount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="taxPercentage"> Tax %:</label>
              <input
                className="w50"
                type="number"
                name="taxPercentage"
                placeholder="Tax %"
                value={currentPurchase.taxPercentage}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="taxAmount"> Tax Amount:</label>
              <input
                className="w50"
                type="number"
                name="taxAmount"
                placeholder="Tax Amount"
                value={currentPurchase.taxAmount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="netAmount"> Net Amount:</label>
              <input
                type="number"
                name="netAmount"
                placeholder="Net Amount"
                value={currentPurchase.netAmount}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="expiry">Expiry Date:</label>
              <input
                style={{ width: "100px" }}
                type="date"
                name="expiryDate"
                id="expiry"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="batchNumber">Batch </label>
              <input
                type="number"
                name="batchNumber"
                placeholder="Batch #"
                onChange={handleInputChange}
              />
            </div>
            <textarea
              name="remarks"
              rows="1"
              style={{
                display: "block",
                transform: "translateY(10px)",
                width: "100%",
              }}
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
        <div
          className="inputs more"
          style={{ minWidth: "700px", overflowX: "scroll" }}
        >
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
                <th>Net</th>
                <th>Retail</th>
                <th>Batch</th>
                <th>Expiry</th>
                <td style={{ width: "3%" }}>Action</td>
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
                  <td>{purchase.netAmount}</td>
                  <td>{purchase.retail}</td>
                  <td>{purchase.batchNumber}</td>
                  <td>{purchase.expiryDate}</td>
                  <td
                    style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => removeFromTable(index)}
                  >
                    <CgClose color="red" />
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

export default PurchaseAdd;
