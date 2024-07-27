import React, { useEffect, useState } from "react";
import "./home.scss";
import './app.css'
import axios from "axios";
import Select from "react-select";
import { server } from "../App";
import { CgClose } from "react-icons/cg";

const Home = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [netPrice, setNetPrice] = useState(0);
  const [specialDiscount, setSpecialDiscount] = useState(0);
  const [received, setReceived] = useState(0);
  const [change, setChange] = useState(0);
  const [options, setOptions] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${server}/items`);
      const items = response.data.map((item) => ({
        value: item._id,
        label: item.itemName,
        ...item,
      }));
      setOptions(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const calculateNetPrice = () => {
    const discount = (totalAmount * discountPercent) / 100;
    setDiscountPrice(discount);
    const priceAfterDiscount = totalAmount - discount;
    const net = priceAfterDiscount - specialDiscount;
    setNetPrice(net);
    const changeAmount = received - net;
    setChange(changeAmount);
  };

  const addItemToList = () => {
    if (!selectedItem || quantity <= 0) return alert("Please select an item and enter a quantity");

    const salePrice = selectedItem.retailPrice;
    const originalTotal = salePrice * quantity;
    const discountAmount = ((selectedItem.retailPrice * quantity) * discountPercent) / 100;
    const finalTotal = originalTotal - discountAmount;
  
    const newItem = {
      name: selectedItem.itemName,
      code: selectedItem.itemCode,
      unit: selectedItem.unit,
      salePrice: salePrice,
      quantity: quantity,
      discount: discountPercent,
      discountAmount: discountAmount,
      stock: selectedItem.stock,
      quantityPerPack: selectedItem.quantityPerPack,
      value: selectedItem.retailPrice * quantity,
      pricePercentage: calculatePricePercentage(originalTotal, finalTotal)
    };
  
    setItemList([...itemList, newItem]);
    setTotalAmount(totalAmount + finalTotal);
    setSelectedItem(null);
    setDiscountPercent(0);
    setQuantity(0);
  };

  function calculatePricePercentage(originalTotal, finalTotal) {
    const percentage = (finalTotal / originalTotal) * 100;
    return percentage.toFixed(2); // Round to 2 decimal places
  }

  const saveSale = async () => {
    try {
      const saleData = {
        items: itemList,
        totalAmount,
        discountPercent,
        discountPrice,
        netPrice,
        specialDiscountReceived: specialDiscount,
        change,
        totalItems: itemList.length,
        date: new Date(),
        invoiceRef: `INV-${Date.now()}`,
      };

      const response = await axios.post(`${server}/purchase/sale/return`, saleData);
      console.log("Sale saved:", response.data);

      setItemList([]);
      setTotalAmount(0);
      setDiscountPercent(0);
      setDiscountPrice(0);
      setNetPrice(0);
      setSpecialDiscount(0);
      setReceived(0);
      setChange(0);
    } catch (error) {
      console.error("Error saving sale:", error);
    }
  };

  return (
    <div className="home">
        <form className="item-form" onSubmit={(e) => e.preventDefault()}>
          <Select
            className="basic-single"
            value={selectedItem}
            onChange={setSelectedItem}
            options={options}
            placeholder="Item"
          />
          <input
            type="number"
            placeholder="S.Price"
            className="price-input"
            value={selectedItem?.retailPrice || ""}
          />
          <label htmlFor="qty">Qty</label>
          <input
            type="number"
            min={0}
            id="qty"
            placeholder="Qty"
            className="qty-input"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <label htmlFor="disc">Disc. %</label>
          <input
            type="number"
            placeholder="Disc."
            id="disc"
            className="disc-input"
            onChange={(e) => setDiscountPercent(e.target.value)}
          />
          <button onClick={addItemToList}>Add to table</button>
        </form>
      <div className="list-container">
        <div className="list">
          <table className="table">
            <thead>
              <tr>
                <td style={{ width: "30%" }}>Name</td>
                <td style={{ width: "7%" }}>Qty</td>
                <td style={{ width: "7%" }}>Rate</td>
                <td style={{ width: "6%" }}>Net</td>
                <td style={{ width: "3%" }}>Action</td>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.salePrice}</td>
                  <td>{item.value - (item.discount * item.value / 100)}</td>
                  <td style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => {
                      setItemList(itemList.filter((i) => i !== item));
                      setTotalAmount(totalAmount - item.value);
                    }}
                  >
                    <CgClose color="red" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="billing-form">
          <div>
            <span>{new Date().toLocaleString()}</span>
            <h2>Current Bill (1)</h2>
          </div>
          <form>
            <div className="form-group">
              <label>Total Amount</label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                onBlur={calculateNetPrice}
              />
            </div>
            <div className="form-group">
              <label>Discount%</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                onBlur={calculateNetPrice}
              />
            </div>
            <div className="form-group">
              <label>Discount Price</label>
              <input type="number" value={discountPrice} readOnly />
            </div>
            <div className="form-group net-price">
              <label>Net Price</label>
              <input type="number" value={netPrice} readOnly />
            </div>
          </form>
        </div>
      </div>
      <div  style={{
        padding: "10px",
       }}>
      <textarea name="remarks" id="remakrs" placeholder="Remarks" cols={60}></textarea>
      </div>
      <button onClick={saveSale}>Save Sale</button>
    </div>
  );
};

export default Home;