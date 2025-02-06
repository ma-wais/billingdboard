import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {server} from '../../App';
import { FaChartBar, FaUsers, FaDollarSign, FaRegClock } from 'react-icons/fa';

const icons = {
  revenue: <FaDollarSign size={24} />,
  users: <FaUsers size={24} />,
  performance: <FaChartBar size={24} />,
  time: <FaRegClock size={24} />,
};

const Shop = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${server}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const formatValue = (value) => {
    return value !== undefined ? value.toFixed(2) : 'N/A';
  };

  return (
    <div className='cards'>
      <Card heading='Today Net Sales' value={formatValue(dashboardData.todayNetSales)} backgroundColor='#E5412D' icon={'revenue'} />
      <Card heading='Last 7 Days Net Sales' value={formatValue(dashboardData.last7DaysNetSales)} backgroundColor='#F0AD4E' icon={'users'} />
      <Card heading='Current Month Sales' value={formatValue(dashboardData.currentMonthSales)} backgroundColor='#888888' />
      <Card heading='Current Year Sales' value={formatValue(dashboardData.currentYearSales)} backgroundColor='#8BC34A' icon={'time'} />
      <Card heading='Today Sale Return' value={formatValue(dashboardData.todaySaleReturn)} backgroundColor='#E5412D' icon={'revenue'} />
      <Card heading='Last 7 Days Sale Return' value={formatValue(dashboardData.last7DaysSaleReturn)} backgroundColor='#F0AD4E' icon={'users'} />
      <Card heading='Current Month Sale Return' value={formatValue(dashboardData.currentMonthSaleReturn)} backgroundColor='#888888' />
      <Card heading='Current Year Sale Return' value={formatValue(dashboardData.currentYearSaleReturn)} backgroundColor='#8BC34A' icon={'time'} />
      <Card heading='Today Purchase' value={formatValue(dashboardData.todayPurchase)} backgroundColor='#E5412D' icon={'revenue'} />
      <Card heading='Last 7 Days Purchase' value={formatValue(dashboardData.last7DaysPurchase)} backgroundColor='#F0AD4E' icon={'users'} />
      <Card heading='Current Month Purchase' value={formatValue(dashboardData.currentMonthPurchase)} backgroundColor='#888888' />
      <Card heading='Current Year Purchase' value={formatValue(dashboardData.currentYearPurchase)} backgroundColor='#8BC34A' icon={'time'} />
      <Card heading='Today Purchase Return' value={formatValue(dashboardData.todayPurchaseReturn)} backgroundColor='#E5412D' icon={'revenue'} />
      <Card heading='Last 7 Days Purchase Return' value={formatValue(dashboardData.last7DaysPurchaseReturn)} backgroundColor='#F0AD4E' icon={'users'} />
      <Card heading='Current Month Purchase Return' value={formatValue(dashboardData.currentMonthPurchaseReturn)} backgroundColor='#888888' />
      <Card heading='Current Year Purchase Return' value={formatValue(dashboardData.currentYearPurchaseReturn)} backgroundColor='#8BC34A' icon={'time'} />
    </div>
  );
};

const Card = ({ heading, value, backgroundColor, icon }) => {
  return (
    <div className='card' style={{ backgroundColor }}>
      <div className='card-icon'>{icons[icon] || <FaChartBar size={24} />}</div>
      <div className='card-content'>
        <p className='card-heading'>{heading}</p>
        <p className='card-value'>{value}</p>
      </div>
    </div>
  );
};

export default Shop;