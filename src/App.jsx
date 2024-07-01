import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header, { SideBar } from "./components/Header";
import "./App.css";
import './styles/globals.scss'

import Dashboard from "./pages/dashboard/Dashboard";
import Shop from "./pages/dashboard/Shop";
import Company from "./pages/dashboard/Company";
import Employee from "./pages/dashboard/Employee";
import City from "./pages/dashboard/City";

import ItemType from "./pages/item/ItemType";
import Unit from "./pages/item/Unit";
import ItemAdd from "./pages/item/ItemAdd";
import FormulaUpdate from "./pages/item/FormulaUpdate";
import ItemList from "./pages/item/ItemList";
import ItemMapSupplier from "./pages/item/ItemMapSupplier";
import UpdateQty from "./pages/item/UpdateQty";
import StockAdjustment from "./pages/item/StockAdjustment";
import ItemUpdate from "./pages/item/ItemUpdate";

import PurchaseAdd from "./pages/purchase/PurchaseAdd";
import PurchaseAdd2 from "./pages/purchase/PurchaseLoose";
import PurchaseList from "./pages/purchase/PurchaseList";
import PurchaseReturn from "./pages/purchase/PurchaseReturn";
import PurchaseReturnList from "./pages/purchase/PurchaseReturnList";

import ItemLedger from "./pages/reports/ItemLegder";
import ItemReport from "./pages/reports/ItemReport";
import PurchaseReport from "./pages/reports/PurchaseReport";
import StockReport from "./pages/reports/StockReport";
import StockAdjustmentReport from "./pages/reports/StockAdjustmentReport";
import ExpiryReport from "./pages/reports/ExpiryReport";
import MinMaxQtyReport from "./pages/reports/MinMaxQtyReport";
import ProfitReport from "./pages/reports/ProfitReport";
import SaleReport from "./pages/reports/SaleReport";
import SaleReturnReport from "./pages/reports/SaleReturnReport";

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header toggleSidebar={toggleSidebar} />
        <div
          className={`main-container ${
            sidebarVisible ? "sidebar-visible" : "sidebar-hidden"
          }`}
        >
          <SideBar className="sideBar" sidebarVisible={sidebarVisible} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/company" element={<Company />} />
              <Route path="/employ" element={<Employee />} />
              <Route path="/city" element={<City />} />
              <Route path="/item-type" element={<ItemType />} />
              <Route path="/unit" element={<Unit />} />
              <Route path="/item" element={<ItemAdd />} />
              <Route path="/item-update" element={<ItemUpdate />} />
              <Route path="/item-formula-update" element={<FormulaUpdate />} />
              <Route path="/item-list" element={<ItemList />} />
              <Route path="/item-map-supplier" element={<ItemMapSupplier />} />
              <Route path="/update-max-qty" element={<UpdateQty />} />
              <Route path="/purchase-add" element={<PurchaseAdd />} />
              <Route path="/purchase-loose" element={<PurchaseAdd2 />} />
              <Route path="/purchase-list" element={<PurchaseList />} />
              <Route path="/stock-adjustment" element={<StockAdjustment />} />
              <Route path="/purchase-return" element={<PurchaseReturn />} />
              <Route path="/purchase-return-list" element={<PurchaseReturnList />} />
              <Route path="/item-ledger" element={<ItemLedger />} />
              <Route path="/item-report" element={<ItemReport />} />
              <Route path="/purchase-report" element={<PurchaseReport />} />
              <Route path="/stock-report" element={<StockReport />} />
              <Route path="/stock-adjustment-report" element={<StockAdjustmentReport />} />
              <Route path="/expiry-report" element={<ExpiryReport />} />
              <Route path="/minmax-report" element={<MinMaxQtyReport />} />
              <Route path="/profit-report" element={<ProfitReport />} />
              <Route path="/sale-report" element={<SaleReport />} />
              <Route path="/sale-return-report" element={<SaleReturnReport />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
