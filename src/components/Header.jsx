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

const Header = ({ toggleSidebar }) => {

  return (
    <>
      <div className="header flex">
        <h2>Billing Dashboard</h2>
        <div>
          <BiLogOut />
          <BiMenu className="menubtn" onClick={toggleSidebar} />
        </div>
      </div>
    </>
  );
};

export const SideBar = ({ sidebarVisible }) => {
  const [show, setShow] = useState("");
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
      <div>
        <BiHomeAlt /> <p>Dashboard</p>
      </div>
      <div onClick={() => setShow(show === "setup" ? "" : "setup")}>
        <CiSettings /> <p>Setup</p> <CgAddR className="add" />
      </div>
      <nav className={show === "setup" ? "p5 h-auto" : ""}>
        <p>Shop</p>
        <p>Company</p>
        <p>Employ</p>
        <p>City</p>
      </nav>
      <div onClick={() => setShow(show === "item" ? "" : "item")}>
        <BsMenuButtonWide /> <p>Item Related</p> <CgAddR className="add" />
      </div>
      <nav className={show === "item" ? "p5 h-auto" : ""}>
        <p>Item Type</p>
        <p>Unit</p>
        <p>Add Item</p>
        <p>Easy Item Update</p>
        <p>Item Formula Update</p>
        <p>Item List</p>
        <p>Item Map Supplier</p>
        <p>Update Max Qty</p>
        <p>Item Formula</p>
      </nav>
      <div onClick={() => setShow(show === "purchase" ? "" : "purchase")}>
        <BiCart /> <p>Purchase Related</p> <CgAddR className="add" />
      </div>
      <nav className={show === "purchase" ? "p5 h-auto" : ""}>
        <p>Purchase Add</p>
        <p>Purchase 2</p>
        <p>Purchase Loose</p>
        <p>Purchase List</p>
        <p>Purchase Edit</p>
        <p>Stock Adjustment</p>
        <p>Purchase Return</p>
        <p>Purchase Return List</p>
        <p>Purchase Order</p>
        <p>Purchase Order Generate</p>
        <p>PO Generate Auto</p>
        <p>Purchase Order List</p>
      </nav>
      <div onClick={() => setShow(show === "report" ? "" : "report")}>
        <CiSettings /> <p>Reports</p> <CgAddR className="add" />
      </div>
      <nav className={show === "report" ? "p5 h-auto" : ""}>
        <p>Item Ledger</p>
        <p>Item Report</p>
        <p>Purchase Report</p>
        <p>Sale Report</p>
        <p>Sale Return Report</p>
        <p>Stock Delete</p>
        <p>Stock Report</p>
        <p>Stock Adjustment Report</p>
        <p>Expiry Report</p>
        <p>Min/Max Qty Report</p>
        <p>Profit Report</p>
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
      <div>
        <FaBoxes /> <p>Cash Summary</p>
      </div>
      <div>
        <BiLogOut /> <p>Logout</p>
      </div>
    </div>
  );
};

export default Header;
