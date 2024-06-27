import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header, { SideBar } from "./components/Header";
import Shop from "./pages/Shop";
import "./App.css";
import './styles/globals.scss'

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
              <Route path="/" element={<Shop />} />
              <Route path="/shop" element={<Shop />} />
              

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
