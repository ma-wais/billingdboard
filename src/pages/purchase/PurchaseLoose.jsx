import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { server } from "../../App";

const PurchaseAdd2 = () => {
  const [options, setOptions] = useState([]);
  const [looseItems, setLooseItems] = useState([]);
  const [currentLooseItem, setCurrentLooseItem] = useState({
    item: "",
    retailPrice: "",
    looseQuantity: "",
    rate: "",
    discountPercent: "",
    discountAmount: "",
    netAmount: "",
  });
  const [purchaseDetails, setPurchaseDetails] = useState({
    supplier: "",
    dateOfPurchase: "",
    billNumber: "",
    paymentMode: "Cash",
    remarks: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState(0);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountsResult = await axios.get(`${server}/accounts`);
        const items = accountsResult.data.map((item) => ({
          value: item.accountName,
          label: item.accountName,
        }));
        setAccounts(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${server}/items`);
        const items = response.data.map((item) => ({
          value: item.itemName,
          label: item.itemName,
          quantityInPack: item.quantityInPack,
          retailPrice: item.retailPrice,
          pricePercentage: item.margin,
        }));
        setOptions(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleInputChange = (field, value) => {
    setCurrentLooseItem({ ...currentLooseItem, [field]: value });
  };

  const handlePurchaseDetailsChange = (field, value) => {
    setPurchaseDetails({ ...purchaseDetails, [field]: value });
  };

  const addToTable = () => {
    setLooseItems([...looseItems, currentLooseItem]);
    setCurrentLooseItem({
      item: "",
      retailPrice: "",
      looseQuantity: "",
      rate: "",
      discountPercent: "",
      discountAmount: "",
      netAmount: "",
    });
  };
  const removeFromTable = (indexToRemove) => {
    const newPurchases = looseItems.filter(
      (_, index) => index !== indexToRemove
    );
    setLooseItems(newPurchases);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const purchaseData = {
        ...purchaseDetails,
        looseItems: looseItems.map((item) => ({
          item: item.item,
          retailPrice: parseFloat(item.retailPrice),
          looseQuantity: parseInt(item.looseQuantity),
          rate: parseFloat(item.rate),
          discountPercent: parseFloat(item.discountPercent),
          discountAmount: parseFloat(item.discountAmount),
          netAmount: parseFloat(item.netAmount),
        })),
      };

      await axios.post(`${server}/purchase/loose`, purchaseData);
      alert("Purchase saved successfully");
      // Reset form after successful submission
      setLooseItems([]);
      setPurchaseDetails({
        supplier: "",
        dateOfPurchase: "",
        billNumber: "",
        paymentMode: "Cash",
        remarks: "",
      });
    } catch (error) {
      console.error("Error saving purchase:", error);
      alert("Error saving purchase. Please try again.");
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Purchase Add (Loose Item)</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="row-inputs">
            <Select
              className="basic-single"
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="account"
              options={accounts}
              placeholder="Account"
              onChange={(e) => {
                if (e) {
                  setAccount(e.value);
                } else {
                  setAccount("");
                  console.log("Cleared");
                }
              }}
            />
            <label htmlFor="pDate">Date of Purchase: </label>
            <input
              style={{ width: "195px" }}
              type="date"
              id="pDate"
              value={purchaseDetails.dateOfPurchase}
              onChange={(e) =>
                handlePurchaseDetailsChange("dateOfPurchase", e.target.value)
              }
              required
            />
          </div>
          <div className="row-inputs">
            <input
              type="text"
              placeholder="Bill #"
              value={purchaseDetails.billNumber}
              onChange={(e) =>
                handlePurchaseDetailsChange("billNumber", e.target.value)
              }
              required
            />
            <label htmlFor="paymentMode">Payment Mode</label>
            <select
              id="paymentMode"
              value={purchaseDetails.paymentMode}
              onChange={(e) =>
                handlePurchaseDetailsChange("paymentMode", e.target.value)
              }
            >
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          <textarea
            placeholder="Remarks"
            value={purchaseDetails.remarks}
            onChange={(e) =>
              handlePurchaseDetailsChange("remarks", e.target.value)
            }
          />
        </div>
        <div className="inputs more">
          <div className="more-inputs">
            <Select
              className="basic-single"
              isClearable={true}
              isSearchable={true}
              name="item"
              options={options}
              onChange={(selectedOption) =>
                handleInputChange(
                  "item",
                  selectedOption ? selectedOption.value : ""
                )
              }
              placeholder="Item"
            />
            <input
              className="w50"
              type="number"
              placeholder="Retail"
              value={currentLooseItem.retailPrice}
              onChange={(e) => handleInputChange("retailPrice", e.target.value)}
            />
            <input
              type="number"
              placeholder="Loose Qty"
              value={currentLooseItem.looseQuantity}
              onChange={(e) =>
                handleInputChange("looseQuantity", e.target.value)
              }
            />
            <input
              className="w50"
              type="number"
              placeholder="Rate"
              value={currentLooseItem.rate}
              onChange={(e) => handleInputChange("rate", e.target.value)}
            />
            <input
              type="number"
              placeholder="Discount %"
              value={currentLooseItem.discountPercent}
              onChange={(e) =>
                handleInputChange("discountPercent", e.target.value)
              }
            />
            <input
              className="w50"
              type="number"
              placeholder="Discount"
              value={currentLooseItem.discountAmount}
              onChange={(e) =>
                handleInputChange("discountAmount", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Net Amount"
              value={currentLooseItem.netAmount}
              onChange={(e) => handleInputChange("netAmount", e.target.value)}
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
        <div className="inputs more">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Retail Price</th>
                <th>Loose Qty</th>
                <th>Rate</th>
                <th>Discount %</th>
                <th>Discount Amount</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {looseItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>{item.retailPrice}</td>
                  <td>{item.looseQuantity}</td>
                  <td>{item.rate}</td>
                  <td>{item.discountPercent}</td>
                  <td>{item.discountAmount}</td>
                  <td>{item.netAmount}</td>
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

export default PurchaseAdd2;
