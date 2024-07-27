import React, { useEffect, useState } from "react";
import "./home.scss";
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
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [user, setUser] = useState("Abdullah");

  useEffect(() => {
    fetchItems();
    console.log(itemList);

  }, [itemList]);

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
    const discountAmount =
      (selectedItem.retailPrice * quantity * discountPercent) / 100;
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
      pricePercentage: calculatePricePercentage(originalTotal, finalTotal),
    };

    setItemList([...itemList, newItem]);
    setTotalAmount(totalAmount + finalTotal);
    setSelectedItem(null);
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
        user,
        doctorName,
        customerPhone,
        customerName,
        date: new Date(),
        invoiceRef: `INV-${Date.now()}`,
      };

      const response = await axios.post(`${server}/purchase/sales`, saleData);
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
            value={selectedItem?.retailPrice || ""}
          />
          <div className="row-inputs" style={{width: "120px"}}>
            <label htmlFor="qty">Qty</label>
            <input
              type="number"
              min={0}
              id="qty"
              placeholder="Qty"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="row-inputs">
            <label htmlFor="disc">Disc.%</label>
            <input
              type="number"
              placeholder="Disc."
              id="disc"
              onChange={(e) => setDiscountPercent(e.target.value)}
            />
          </div>
          <input
            type="number"
            placeholder="Stock"
            value={selectedItem?.stock || ""}
            readOnly
          />
          <input
            type="number"
            placeholder="Qty.Pack"
            value={selectedItem?.quantityInPack || ""}
            readOnly
          />
          <button onClick={addItemToList}>Add to table</button>
        </form>
      <div className="list-container">
        <div className="list">
          <table>
            <thead>
              <tr>
                <td style={{ width: "30%" }}>Name</td>
                <td style={{ width: "7%" }}>Unit</td>
                <td style={{ width: "7%" }}>Qty</td>
                <td style={{ width: "7%" }}>Rate</td>
                <td style={{ width: "7%" }}>Value</td>
                <td style={{ width: "6%" }}>Disc%</td>
                <td style={{ width: "5%" }}>Disc.</td>
                <td style={{ width: "6%" }}>Net</td>
                <td style={{ width: "7%" }}>P%</td>
                <td style={{ width: "5%" }}>Action</td>
              </tr>
            </thead>
            <tbody style={{ marginTop: "10px" }}>
              {itemList.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.unit}</td>
                  <td>{item.quantity}</td>
                  <td>{item.salePrice}</td>
                  <td>{item.value}</td>
                  <td>{item.discount}%</td>
                  <td>{item.discountAmount}</td>
                  <td>{item.value - (item.discount * item.value) / 100}</td>
                  <td>{item.pricePercentage}%</td>
                  <td style={{ textAlign: "center", cursor: "pointer" }}>
                    <CgClose color="red"
                      onClick={() => {
                        setItemList(itemList.filter((i) => i !== item));
                        setTotalAmount(totalAmount - item.value);
                      }}
                    />
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
            <div className="form-group">
              <label>Special Discount (F3)</label>
              <input
                type="number"
                value={specialDiscount}
                onChange={(e) => setSpecialDiscount(Number(e.target.value))}
                onBlur={calculateNetPrice}
              />
            </div>
            <div className="form-group">
              <label>Received</label>
              <input
                type="number"
                value={received}
                onChange={(e) => setReceived(Number(e.target.value))}
                onBlur={calculateNetPrice}
              />
            </div>
            <div className="form-group">
              <label>Change</label>
              <input type="number" value={change} readOnly />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => alert("Save & Print")}>
                Save & Print (F12)
              </button>
              <button type="button" onClick={() => alert("Save")}>
                Save (F9)
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="info">
        <div>
          <h6>Total Items:</h6>{" "}
          <input className="w40" type="text" value={itemList.length} readOnly />
        </div>
        <div>
          <h6>Customer: </h6>
          <input
            type="text"
            // value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div>
          <h6>Customer Phone </h6>
          <input
            type="text"
            // value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>
        <div>
          <h6>Doctor Name </h6>
          <input
            type="text"
            // value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        <div>
          <h6>User:(F7)</h6>
          <select
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            <option value="Abdullah">Abdullah</option>
            <option value="User2">User2</option>
            <option value="User3">User3</option>
          </select>
        </div>
      </div>
      <button onClick={saveSale}>Save Sale</button>
    </div>
  );
};

export default Home;
