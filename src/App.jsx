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

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
