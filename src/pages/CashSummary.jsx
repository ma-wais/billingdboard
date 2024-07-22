import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../App";

const CashSummary = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [summaryData, setSummaryData] = useState(null);
  const [openingCash, setOpeningCash] = useState(0);

  const handleFromChange = (e) => setFrom(e.target.value);
  const handleToChange = (e) => setTo(e.target.value);

  const fetchSummaryData = async () => {
    try {
      const [salesResponse, cashVouchersResponse, openingCashResponse] =
        await Promise.all([
          axios.get(`${server}/purchase/sales?from=${from}&to=${to}`),
          axios.get(
            `${server}/accounts/cashvoucher?dateFrom=${from}&dateTo=${to}`
          ),
          axios.get(`${server}/purchase/openingCash?date=${from}`),
        ]);

      const sales = salesResponse.data;
      const cashVouchers = cashVouchersResponse.data;
      setOpeningCash(openingCashResponse.data.openingCash);

      const totalSale = sales.totals.totalSaleValue;
      const creditSale = 0;
      const saleReturn = sales.totals.totalDiscount;
      const netSales = sales.totals.totalNetAmount;

      const cashPayments = cashVouchers
        .filter((v) => v.type === "CashPayment")
        .reduce((sum, v) => sum + v.amount, 0);
      const cashReceipts = cashVouchers
        .filter((v) => v.type === "CashReceipt")
        .reduce((sum, v) => sum + v.amount, 0);

      const currentCashInHand = netSales + cashReceipts - cashPayments;

      setSummaryData({
        totalSale,
        creditSale,
        saleReturn,
        netSales,
        cashPayments,
        cashReceipts,
        currentCashInHand,
      });
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSummaryData();
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Cash Summary</p>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="row-inputs">
          <label htmlFor="from">From</label>
          <input
            type="date"
            name="from"
            id="from"
            value={from}
            onChange={handleFromChange}
            required
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="to">To</label>
          <input
            type="date"
            name="to"
            id="to"
            value={to}
            onChange={handleToChange}
            required
          />
        </div>
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>

      {summaryData && (
        <table className="table">
          <thead>
            <tr>
              <th colSpan="2">Sales Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Sale</td>
              <td>{summaryData.totalSale.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Credit Sale</td>
              <td>{summaryData.creditSale.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Sale Return</td>
              <td>{summaryData.saleReturn.toFixed(2)}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan="2">Cash Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Opening Cash</td>
              <td>{openingCash.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Net Sales (Sales - Credit Sale - Sale Return)</td>
              <td>{summaryData.netSales.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Cash Payments</td>
              <td>{summaryData.cashPayments.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Cash Receipts</td>
              <td>{summaryData.cashReceipts.toFixed(2)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Current Cash In Hand</td>
              <td>{summaryData.currentCashInHand.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default CashSummary;
