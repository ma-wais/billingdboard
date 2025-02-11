import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { server } from "../../App";
import { CgClose } from "react-icons/cg";

const PurchaseAdd = () => {
  const [options, setOptions] = useState([]);
  const [purchases, setPurchases] = useState([]);
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
    taxAmount2: 0,
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
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({});
  const [dateOfPurchase, setDateOfPurchase] = useState(new Date());
  const [billNumber, setBillNumber] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsResult, itemsResult] = await Promise.all([
          axios.get(`${server}/accounts`),
          axios.get(`${server}/items`),
        ]);

        const accounts = accountsResult.data.map((item) => ({
          value: item.accountName,
          label: item.accountName,
        }));

        const items = itemsResult.data.map((item) => ({
          value: item._id,
          label: item.itemName,
          ...item,
        }));

        setAccounts(accounts);
        setOptions(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
    const taxAmount2 = parseFloat(updatedPurchase.taxAmount2) || 0;
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
          updatedPurchase.pricePercentage = ((rate / retail) * 100).toFixed(2);
        }
        break;
      case "retail":
        if (rate > 0) {
          updatedPurchase.pricePercentage = ((rate / retail) * 100).toFixed(2);
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
    updatedPurchase.netAmount = (
      totalAfterDiscount +
      taxAmount +
      taxAmount2
    ).toFixed(2);
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
      taxAmount2: "",
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
      discountPercentage: 0, // Calculate based on your logic
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

    axios
      .post(`${server}/purchase`, payload)
      .then((response) => {
        console.log("Purchase added:", response.data);
      })
      .catch((error) => {
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
              options={accounts}
              placeholder="Account"
              onChange={(e) => {
                setAccount(e.value);
              }}
            />
            <label htmlFor="dateOfPurchase">Date of Purchase:</label>
            <input
              type="date"
              name="dateOfPurchase"
              id="dateOfPurchase"
              onChange={(e) => {
                setDateOfPurchase(e.target.value);
              }}
            />
          </div>
          <div className="row-inputs">
            <input
              type="text"
              name="billNumber"
              placeholder="Bill #"
              onChange={(e) => setBillNumber(e.target.value)}
            />
            <select
              name="paymentMode"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
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
              isClearable={true}
              options={options}
              placeholder="Item"
              onChange={(e) =>
                setCurrentPurchase({ ...currentPurchase, item: e.value })
              }
            />
            <label htmlFor="quantity"> Quantity:</label>
            <input
              className="w50"
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={currentPurchase.quantity}
              onChange={handleInputChange}
            />
            <label htmlFor="bonusQuantity"> Bonus Qty:</label>
            <input
              className="w50"
              type="number"
              name="bonusQuantity"
              placeholder="Bonus Qty"
              onChange={handleInputChange}
            />
            <label htmlFor="rate"> Rate:</label>
            <input
              type="number"
              name="rate"
              placeholder="Rate (Purchase Price)"
              value={currentPurchase.rate}
              onChange={handleInputChange}
            />
            <label htmlFor="total"> Total</label>
            <input
              className="w50"
              type="number"
              name="total"
              placeholder="Total"
              value={currentPurchase.total}
              onChange={handleInputChange}
            />
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
            <label htmlFor="retail"> Retail:</label>
            <input
              className="w50"
              type="number"
              name="retail"
              placeholder="Retail"
              value={currentPurchase.retail}
              onChange={handleInputChange}
            />
            <label htmlFor="pricePercentage"> Price %:</label>
            <input
              className="w50"
              type="number"
              name="pricePercentage"
              placeholder="Price %"
              value={currentPurchase.pricePercentage}
              readOnly
            />
            <label htmlFor="discountPercentage"> Discount %:</label>
            <input
              type="number"
              name="discountPercentage"
              placeholder="Discount %"
              value={currentPurchase.discountPercentage}
              onChange={handleInputChange}
              readOnly
            />
            <label htmlFor="discountAmount"> Discount Amount:</label>
            <input
              type="number"
              name="discountAmount"
              placeholder="Discount Amount"
              value={currentPurchase.discountAmount}
              onChange={handleInputChange}
            />
            <label htmlFor="priceAfterDiscount"> Price After Discount:</label>
            <input
              type="number"
              name="priceAfterDiscount"
              placeholder="Price after Discount"
              value={currentPurchase.priceAfterDiscount}
              onChange={handleInputChange}
            />
            <label htmlFor="taxPercentage"> Tax %:</label>
            <input
              className="w50"
              type="number"
              name="taxPercentage"
              placeholder="Tax %"
              value={currentPurchase.taxPercentage}
              onChange={handleInputChange}
            />
            <label htmlFor="taxAmount"> Tax Amount:</label>
            <input
              className="w50"
              type="number"
              name="taxAmount"
              placeholder="Tax Amount"
              value={currentPurchase.taxAmount}
              onChange={handleInputChange}
            />
            <label htmlFor="taxAmount2"> Tax Amount2:</label>
            <input
              className="w50"
              type="number"
              name="taxAmount2"
              placeholder="Tax Amount2"
              value={currentPurchase.taxAmount2}
              onChange={handleInputChange}
            />
            <label htmlFor="netAmount"> Net Amount:</label>
            <input
              type="number"
              name="netAmount"
              placeholder="Net Amount"
              value={currentPurchase.netAmount}
              readOnly
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
                marginLeft: "auto",
              }}
            >
              Add To Table
            </button>
          </div>
        </div>
        <div className="inputs more">
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
                <td className="w50">Action</td>
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
