import React, { useState, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header, { SideBar } from "./components/Header";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import './styles/globals.scss'
import Shop from "./pages/Shop";
import Company from "./pages/Company";
import Employee from "./pages/Employee";
import City from "./pages/City";
import ItemType from "./pages/ItemType";
import Unit from "./pages/Unit";
import ItemAdd from "./pages/ItemAdd";
import FormulaUpdate from "./pages/FormulaUpdate";
import ItemList from "./pages/ItemList";
import ItemMapSupplier from "./pages/ItemMapSupplier";
import UpdateQty from "./pages/UpdateQty";
import PurchaseAdd from "./pages/PurchaseAdd";
import PurchaseAdd2 from "./pages/PurchaseLoose";
import PurchaseList from "./pages/PurchaseList";
import StockAdjustment from "./pages/StockAdjustment";
import PurchaseReturn from "./pages/PurchaseReturn";
import PurchaseReturnList from "./pages/PurchaseReturnList";
import ItemLedger from "./pages/reports/ItemLegder";
import ItemReport from "./pages/reports/ItemReport";
import PurchaseReport from "./pages/reports/PurchaseReport";
import StockReport from "./pages/reports/StockReport";
import StockAdjustmentReport from "./pages/reports/StockAdjustmentReport";
import ExpiryReport from "./pages/reports/ExpiryReport";
import MinMaxQtyReport from "./pages/reports/MinMaxQtyReport";
import ProfitReport from "./pages/reports/ProfitReport";
import Reactselect from "./pages/reactselect";

// import FilterableSelect from "./pages/FilterSelect";
// import ItemUpdate from "./pages/ItemUpdate";


const ItemUpdate = lazy(() => import("./pages/ItemUpdate"));

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
              {/* <Route path="/filter" element={<FilterableSelect />} /> */}
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
              <Route path="/reactselect" element={<Reactselect />} />

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
