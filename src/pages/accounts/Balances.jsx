import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../App';


const Balances = () => {
  const [balances, setBalances] = useState(null);
  const [showReceivable, setShowReceivable] = useState(true);
  const [showPayable, setShowPayable] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [showTrading, setShowTrading] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchBalances = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/accounts/balances?showReceivable=${showReceivable}&showPayable=${showPayable}&showExpenses=${showExpenses}&showTrading=${showTrading}`);
      setBalances(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching balances:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [showReceivable, showPayable, showExpenses, showTrading]);

  const renderTable = (title, data) => {
    if (!data || !data.accounts) return null;
    return (
      <table className='table'>
        <thead>
          <tr>
            <th colSpan="3">{title}</th>
          </tr>
          <tr>
            <th>SR#</th>
            <th>Account Title</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.accounts.map((account, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{account.accountName}</td>
              <td>{account.balance.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2">Total</td>
            <td>{data.total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='box'>
      <div className='heading'>
        <p>Balances</p>
      </div>
      <div className='inputs' style={{maxWidth: "300px"}}>
        <div className='row-inputs'>
          <label htmlFor="receivable">Receivable</label>
          <input type="checkbox" name="receivable" id="receivable" style={{marginLeft: "auto"}} 
                 checked={showReceivable} onChange={e => setShowReceivable(e.target.checked)} />
        </div>
        <div className='row-inputs'>
          <label htmlFor="payable">Payable</label>
          <input type="checkbox" name="payable" id="payable" style={{marginLeft: "auto"}}
                 checked={showPayable} onChange={e => setShowPayable(e.target.checked)} />
        </div>
        <div className='row-inputs'>
          <label htmlFor="expenses">Expenses</label>
          <input type="checkbox" name="expenses" id="expenses" style={{marginLeft: "auto"}}
                 checked={showExpenses} onChange={e => setShowExpenses(e.target.checked)} />
        </div>
        <div className='row-inputs'>
          <label htmlFor="trading">Trading</label>
          <input type="checkbox" name="trading" id="trading" style={{marginLeft: "auto"}}
                 checked={showTrading} onChange={e => setShowTrading(e.target.checked)} />
        </div>
      </div>
      {/* <div className='submit'>
        <button onClick={fetchBalances}>Refresh</button>
      </div> */}
      {balances && (
        <>
          {showReceivable && renderTable('Receivable', balances.receivable)}
          {showPayable && renderTable('Payable', balances.payable)}
          {showExpenses && renderTable('Expenses', balances.expenses)}
          {showTrading && renderTable('Trading', balances.trading)}
        </>
      )}
    </div>
  );
};

export default Balances;