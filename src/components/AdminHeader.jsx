import React, { useState } from "react";
import {
  BiCart,
  BiHomeAlt,
  BiLogOut,
  // BiChevronDown,
  // BiMenu,
} from "react-icons/bi";
import "../styles/header.scss";
import { CgAddR, CgProfile, CgMenuLeft, CgDollar} from "react-icons/cg";
import { RiFilePaperFill, RiSettings5Line  } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";

export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState("");

  if (location.pathname === "/login" || location.pathname.includes("sales")) {
    return null;
  }

  const logout = async () => {
    try {
      await axios.post(`${server}/users/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const renderSection = (title, icon, items) => (
    <>
      <div
        onClick={() =>
          setExpandedSection(expandedSection === title ? "" : title)
        }
      >
        {icon} <p>{title}</p> <CgAddR className="add" />
      </div>
      <nav className={expandedSection === title ? "expanded" : ""}>
        {items.map((item) => (
          <p key={item.path} onClick={() => navigate(item.path)}>
            {item.label}
          </p>
        ))}
      </nav>
    </>
  );

  const sections = [
    {
      title: "Setup",
      icon: <RiSettings5Line />,
      items: [
        { path: "/shop", label: "Shop" },
        { path: "/company", label: "Company" },
        { path: "/employ", label: "Employee" },
        { path: "/city", label: "City" },
      ],
    },
    {
      title: "Item Related",
      icon: <CgMenuLeft />,
      items: [
        { path: "/item-type", label: "Item Type" },
        { path: "/unit", label: "Unit" },
        { path: "/item", label: "Add Item" },
        { path: "/item-update", label: "Easy Item Update" },
        { path: "/item-formula-update", label: "Item Formula Update" },
        { path: "/item-list", label: "Item List" },
        { path: "/item-map-supplier", label: "Item Map Supplier" },
        { path: "/update-max-qty", label: "Update Max Qty" },
        { path: "/formula", label: "Formula" },
      ],
    },
    {
      title: "Purchase Related",
      icon: <BiCart />,
      items: [
        { path: "/purchase-add", label: "Purchase Add" },
        { path: "/purchase-loose", label: "Purchase Loose" },
        { path: "/purchase-list", label: "Purchase List" },
        { path: "/stock-adjustment", label: "Stock Adjustment" },
        { path: "/purchase-return", label: "Purchase Return" },
        { path: "/purchase-return-list", label: "Purchase Return List" },
      ],
    },
    {
      title: "Reports",
      icon: <RiSettings5Line />,
      items: [
        { path: "/item-ledger", label: "Item Ledger" },
        { path: "/item-report", label: "Item Report" },
        { path: "/purchase-report", label: "Purchase Report" },
        { path: "/sale-report", label: "Sale Report" },
        { path: "/sale-return-report", label: "Sale Return Report" },
        { path: "/stock-report", label: "Stock Report" },
        { path: "/stock-adjustment-report", label: "Stock Adjustment Report" },
        { path: "/expiry-report", label: "Expiry Report" },
        { path: "/minmax-report", label: "Min/Max Qty Report" },
        { path: "/profit-report", label: "Profit Report" },
      ],
    },
    {
      title: "Accounts",
      icon: <RiFilePaperFill />,
      items: [
        { path: "/add-account", label: "Add Account" },
        { path: "/voucher", label: "Cash Payment Voucher" },
        { path: "/voucher-list", label: "Cash Payment List" },
        { path: "/receipt-voucher", label: "Cash Receipt Voucher" },
        { path: "/receipt-voucher-list", label: "Cash Receipt List" },
        { path: "/account-balances", label: "Account Balances" },
        { path: "/account-ledger", label: "Account Ledger" },
        { path: "/cash-report", label: "Cash Report" },
      ],
    },
  ];

  return (
    <div className="sideBar" style={{ transition: "all 0.1s" }}>
      <div>
        <div className="profileTab">
          <div>
            {localStorage.getItem("image") ? (
              <img src={localStorage.getItem("image")} alt="profile" />
            ) : (
              <CgProfile />
            )}
          </div>
          <p>Main Admin</p>
        </div>
        <div onClick={() => navigate("/")}>
          <BiHomeAlt /> <p>Dashboard</p>
        </div>
        {sections.map((section) => (
          <React.Fragment key={section.title}>
            {renderSection(section.title, section.icon, section.items)}
          </React.Fragment>
        ))}

        <div onClick={() => navigate("/cash-summary")}>
          <CgDollar /> <p>Cash Summary</p>
        </div>
      </div>
      <div onClick={logout} className="logout">
        <BiLogOut />
      </div>
    </div>
  );
};

// const Header = ({ token, setToken, toggleSidebar, setUser }) => {
//   const navigate = useNavigate();

//   if (location.pathname.includes("sales")) {
//     return null;
//   }

//   const logout = async () => {
//     try {
//       await axios.post(`${server}/users/logout`, {}, { withCredentials: true });

//       localStorage.removeItem("token");
//       setToken(null);
//       setUser(null);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   return (
//       <div className="header">
//         {token !== null && (
//           <div>
//             <BiLogOut className="logout" onClick={logout} title="Logout" />
//             <BiMenu
//               className="menubtn"
//               onClick={toggleSidebar}
//               title="Toggle Menu"
//             />
//           </div>
//         )}
//       </div>
//   );
// };

// export default Header;
