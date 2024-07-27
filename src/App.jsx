import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Header, { SideBar } from "./components/Header";

import City from "./pages/dashboard/City";
import Company from "./pages/dashboard/Company";
import Dashboard from "./pages/dashboard/Dashboard";
import Employee from "./pages/dashboard/Employee";
import Shop from "./pages/dashboard/Shop";

import ItemType from "./pages/item/ItemType";
import Unit from "./pages/item/Unit";
import ItemAdd from "./pages/item/ItemAdd";
import ItemUpdate from "./pages/item/ItemUpdate";
import FormulaUpdate from "./pages/item/FormulaUpdate";
import ItemList from "./pages/item/ItemList";
import ItemMapSupplier from "./pages/item/ItemMapSupplier";
import UpdateQty from "./pages/item/UpdateQty";
import Formula from "./pages/item/Formula";

import StockAdjustment from "./pages/item/StockAdjustment";
import PurchaseAdd from "./pages/purchase/PurchaseAdd";
import PurchaseList from "./pages/purchase/PurchaseList";
import PurchaseAdd2 from "./pages/purchase/PurchaseLoose";
import PurchaseReturn from "./pages/purchase/PurchaseReturn";
import PurchaseReturnList from "./pages/purchase/PurchaseReturnList";

import Account from "./pages/accounts/Account";
import AccountLedger from "./pages/accounts/AccountLedger";
import Balances from "./pages/accounts/Balances";
import CashReport from "./pages/accounts/CashReport";
import PaymentList from "./pages/accounts/PaymentList";
import PaymentVoucher from "./pages/accounts/PaymentVoucher";
import ReceiptList from "./pages/accounts/ReceiptList";
import ReceiptVoucher from "./pages/accounts/ReceiptVoucher";
import ExpiryReport from "./pages/reports/ExpiryReport";
import ItemLedger from "./pages/reports/ItemLegder";
import ItemReport from "./pages/reports/ItemReport";
import MinMaxQtyReport from "./pages/reports/MinMaxQtyReport";
import ProfitReport from "./pages/reports/ProfitReport";
import PurchaseReport from "./pages/reports/PurchaseReport";
import SaleReport from "./pages/reports/SaleReport";
import SaleReturnReport from "./pages/reports/SaleReturnReport";
import StockAdjustmentReport from "./pages/reports/StockAdjustmentReport";
import StockReport from "./pages/reports/StockReport";

import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Protected from "./components/Protected";
import CashSummary from "./pages/CashSummary";
import "./App.css";
import "./styles/globals.scss";

import EmployeeEdit from "./pages/dashboard/EmployeeEdit";
import CompanyEdit from "./pages/dashboard/CompanyEdit";
import CityEdit from "./pages/dashboard/CityEdit";
import UnitUpdate from "./pages/item/UnitUpdate";
import OriginalFormula from "./pages/item/OriginalFormulaUpdate";
import EditAccount from "./pages/accounts/AccountEdit";
import CashVoucherEdit from "./pages/accounts/CashVoucherEdit";
import ReceiptVoucherEdit from "./pages/accounts/RecieptVoucherEdit";
// import ItemTypeUpdate from "./pages/item/ItemTypeUpdate";

import Home from './pages2/Home.jsx'
import List from './pages2/List.jsx'
import Return from './pages2/Return.jsx'
import ReturnList from './pages2/ReturnList.jsx'
import Stock from './pages2/Stock.jsx'
import Reprint from './pages2/Reprint.jsx'
import Change from './pages2/Change.jsx'
import EmpLogin from './pages2/EmpLogin.jsx'
import EmpProtected from "./components/EmpProtected.jsx";

export const server = "https://billing-api-1.onrender.com/api/v1";
// export const server = "http://localhost:4000/api/v1";

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(
    window.innerWidth > 1000
  );
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [token2, setToken2] = useState(localStorage.getItem("token2"));
  
  console.log(token2);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${server}/users/user`, {
          withCredentials: true
        });
        setUser(res.data);
        // console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    if (token) {
      getUser();
    } 
    else{
      console.log("no token")
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header token={token} setToken={setToken} setUser={setUser} toggleSidebar={toggleSidebar} />
        <div
          className={`main-container ${
            sidebarVisible ? "sidebar-visible" : "sidebar-hidden"
          }`}
        >
          <SideBar className="sideBar" setUser={setUser} sidebarVisible={sidebarVisible} />
          <div className="content">
            <Routes>
              <Route element={<Protected />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/company" element={<Company />} />
                <Route path="/company/:id" element={<CompanyEdit />} />
                <Route path="/employ" element={<Employee />} />
                <Route path="/employee/:id" element={<EmployeeEdit />} />
                <Route path="/city" element={<City />} />
                <Route path="/city/:id" element={<CityEdit />} />

                <Route path="/item-type" element={<ItemType />} />
                {/* <Route path="/item-type/:id" element={<ItemTypeUpdate />} /> */}
                <Route path="/unit" element={<Unit />} />
                <Route path="/unit/:id" element={<UnitUpdate />} />
                <Route path="/item" element={<ItemAdd />} />
                <Route path="/item-update" element={<ItemUpdate />} />
                <Route path="/item-formula-update" element={<FormulaUpdate />} />
                <Route path="/item-list" element={<ItemList />} />
                <Route path="/item-map-supplier" element={<ItemMapSupplier />} />
                <Route path="/update-max-qty" element={<UpdateQty />} />
                <Route path="/formula" element={<Formula />} />
                <Route path="/formula/:id" element={<OriginalFormula />} />

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

                <Route path="/add-account" element={<Account />} />
                <Route path="/account/:id" element={<EditAccount />} />
                <Route path="/voucher" element={<PaymentVoucher />} />
                <Route path="/voucher/:id" element={<CashVoucherEdit />} />
                <Route path="/voucher-list" element={<PaymentList />} />
                <Route path="/receipt-voucher" element={<ReceiptVoucher />} />
                <Route path="/receipt-voucher/:id" element={<ReceiptVoucherEdit />} />
                <Route path="/receipt-voucher-list" element={<ReceiptList />} />
                <Route path="/account-balances" element={<Balances />} />
                <Route path="/account-ledger" element={<AccountLedger />} />
                <Route path="/cash-report" element={<CashReport />} />

                <Route path="/cash-summary" element={<CashSummary />} />
              </Route>

              <Route element={<EmpProtected classnam="body" />} >
                <Route path='/sales' element={<Home />} />
                <Route path='/sales/list' element={<List />} />
                <Route path='/sales/return' element={<Return />} />
                <Route path='/sales/returnlist' element={<ReturnList />} />
                <Route path='/sales/stock' element={<Stock />} />
                <Route path='/sales/reprint' element={<Reprint />} />
                <Route path='/sales/change' element={<Change id={token2}/>} />
              </Route>

              <Route path="/login" element={<Login setToken={setToken} token={token} setUser={setUser} />} />
              <Route path='/sales/login' element={<EmpLogin setToken2={setToken2} token={token2}/>} />
              <Route path="/register"element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
