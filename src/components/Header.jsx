import React, { useState } from "react";
import {
  BiCart,
  BiChevronDown,
  BiHomeAlt,
  BiLogOut,
  BiMenu,
} from "react-icons/bi";
import "../styles/header.scss";
import { CgAddR, CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { BsMenuButtonWide } from "react-icons/bs";
import { RiFilePaperFill } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {

  return (
    <>
      <div className="header flex">
        <h2>Billing Dashboard</h2>
        <div>
          <BiLogOut className="logout"/>
          <BiMenu className="menubtn" onClick={toggleSidebar} />
        </div>
      </div>
    </>
  );
};

export const SideBar = ({ sidebarVisible }) => {
  const [show, setShow] = useState("");
  const navigate = useNavigate();
//   const [sideShow, setSideShow] = useState(true);

  return (
    <div
      className="sideBar"
      style={{
        transition: "all 0.1s",
      }}
    >
      <div className="profileTab">
        <CgProfile /> <p>Main Admin</p> <BiChevronDown />
      </div>
      <div onClick={() => navigate("/")}>
        <BiHomeAlt /> <p>Dashboard</p>
      </div>
      <div onClick={() => setShow(show === "setup" ? "" : "setup")}>
        <CiSettings /> <p>Setup</p> <CgAddR className="add" />
      </div>
      <nav className={show === "setup" ? "p5 h-auto" : ""}>
        <p onClick={() => navigate("/shop")}>Shop</p>
        <p onClick={() => navigate("/company")}>Company</p>
        <p onClick={() => navigate("/employ")}>Employ</p>
        <p onClick={() => navigate("/city")}>City</p>
      </nav>
      <div onClick={() => setShow(show === "item" ? "" : "item")}>
        <BsMenuButtonWide /> <p>Item Related</p> <CgAddR className="add" />
      </div>
      <nav className={show === "item" ? "p5 h-auto" : ""}>
        <p onClick={() => navigate("/item-type")}>Item Type</p>
        <p onClick={() => navigate("/unit")}>Unit</p>
        <p onClick={() => navigate("/item")}>Add Item</p>
        <p onClick={() => navigate("/item-update")}>Easy Item Update</p>
        <p onClick={() => navigate("/item-formula-update")}>Item Formula Update</p>
        <p onClick={() => navigate("/item-list")}>Item List</p>
        <p onClick={() => navigate("/item-map-supplier")}>Item Map Supplier</p>
        <p onClick={() => navigate("/update-max-qty")}>Update Max Qty</p>
        <p onClick={() => navigate("/item-formula")}>Item Formula</p>
      </nav>
      <div onClick={() => setShow(show === "purchase" ? "" : "purchase")}>
        <BiCart /> <p>Purchase Related</p> <CgAddR className="add" />
      </div>
      <nav className={show === "purchase" ? "p5 h-auto" : ""}>
        <p onClick={() => navigate("/purchase-add")}>Purchase Add</p>
        {/* <p >Purchase 2</p>/ */}
        <p onClick={() => navigate("/purchase-loose")}>Purchase Loose</p>
        <p onClick={() => navigate("/purchase-list")}>Purchase List</p>
        {/* <p onClick={() => navigate("/purchase-edit")}>Purchase Edit</p> */}
        <p onClick={() => navigate("/stock-adjustment")}>Stock Adjustment</p>
        <p onClick={() => navigate("/purchase-return")}>Purchase Return</p>
        <p onClick={() => navigate("/purchase-return-list")}>Purchase Return List</p>
        {/* <p>Purchase Order</p> */}
        {/* <p>Purchase Order Generate</p> */}
        {/* <p>PO Generate Auto</p> */}
        {/* <p>Purchase Order List</p> */}
      </nav>
      <div onClick={() => setShow(show === "report" ? "" : "report")}>
        <CiSettings /> <p>Reports</p> <CgAddR className="add" />
      </div>
      <nav className={show === "report" ? "p5 h-auto" : ""}>
        <p onClick={() => navigate("/item-ledger")}>Item Ledger</p>
        <p onClick={() => navigate("/item-report")}>Item Report</p>
        <p onClick={() => navigate("/purchase-report")}>Purchase Report</p>
        {/* <p onClick={() => navigate("/sale-report")}>Sale Report</p> */}
        {/* <p onClick={() => navigate("/sale-return-report")}>Sale Return Report</p> */}
        {/* <p onClick={() => navigate("/stock-report")}>Stock Delete</p> */}
        <p onClick={() => navigate("/stock-report")}>Stock Report</p>
        <p onClick={() => navigate("/stock-adjustment-report")}>Stock Adjustment Report</p>
        <p onClick={() => navigate("/expiry-report")}>Expiry Report</p>
        <p onClick={() => navigate("/minmax-report")}>Min/Max Qty Report</p>
        <p onClick={() => navigate("/profit-report")}>Profit Report</p>
      </nav>
      <div onClick={() => setShow(show === "account" ? "" : "account")}>
        <RiFilePaperFill /> <p>Accounts</p> <CgAddR className="add" />
      </div>
      <nav className={show === "account" ? "p5 h-auto" : ""}>
        <p>Add Account</p>
        <p>Cash Payment Voucher</p>
        <p>Cash Payment List</p>
        <p>Cash Receipt Voucher</p>
        <p>Cash Receipt List</p>
        <p>Account Balances</p>
        <p>Account Ledger</p>
        <p>Cash Report</p>
      </nav>
      <div onClick={() => navigate("/cash-summary")}>
        <FaBoxes /> <p>Cash Summary</p>
      </div>
      <div>
        <BiLogOut /> <p>Logout</p>
      </div>
    </div>
  );
};

export default Header;
