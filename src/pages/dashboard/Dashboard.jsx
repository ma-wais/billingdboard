import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../App';
import { FaChartBar, FaUsers, FaDollarSign, FaRegClock } from 'react-icons/fa';

const icons = {
  revenue: <FaDollarSign size={24} />,
  users: <FaUsers size={24} />,
  performance: <FaChartBar size={24} />,
  time: <FaRegClock size={24} />,
};

const COLORS = {
  red: '#E5412D',
  orange: '#F0AD4E',
  gray: '#888888',
  green: '#8BC34A',
};

const cardData = [
  { key: 'todayNetSales', heading: 'Today Net Sales', backgroundColor: COLORS.red, icon: 'revenue' },
  { key: 'last7DaysNetSales', heading: 'Last 7 Days Net Sales', backgroundColor: COLORS.orange, icon: 'users' },
  { key: 'currentMonthSales', heading: 'Current Month Sales', backgroundColor: COLORS.gray },
  { key: 'currentYearSales', heading: 'Current Year Sales', backgroundColor: COLORS.green, icon: 'time' },
  { key: 'todaySaleReturn', heading: 'Today Sale Return', backgroundColor: COLORS.red, icon: 'revenue' },
  { key: 'last7DaysSaleReturn', heading: 'Last 7 Days Sale Return', backgroundColor: COLORS.orange, icon: 'users' },
  { key: 'currentMonthSaleReturn', heading: 'Current Month Sale Return', backgroundColor: COLORS.gray },
  { key: 'currentYearSaleReturn', heading: 'Current Year Sale Return', backgroundColor: COLORS.green, icon: 'time' },
  { key: 'todayPurchase', heading: 'Today Purchase', backgroundColor: COLORS.red, icon: 'revenue' },
  { key: 'last7DaysPurchase', heading: 'Last 7 Days Purchase', backgroundColor: COLORS.orange, icon: 'users' },
  { key: 'currentMonthPurchase', heading: 'Current Month Purchase', backgroundColor: COLORS.gray },
  { key: 'currentYearPurchase', heading: 'Current Year Purchase', backgroundColor: COLORS.green, icon: 'time' },
  { key: 'todayPurchaseReturn', heading: 'Today Purchase Return', backgroundColor: COLORS.red, icon: 'revenue' },
  { key: 'last7DaysPurchaseReturn', heading: 'Last 7 Days Purchase Return', backgroundColor: COLORS.orange, icon: 'users' },
  { key: 'currentMonthPurchaseReturn', heading: 'Current Month Purchase Return', backgroundColor: COLORS.gray },
  { key: 'currentYearPurchaseReturn', heading: 'Current Year Purchase Return', backgroundColor: COLORS.green, icon: 'time' },
];

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

  const formatValue = (value) => (value !== undefined ? value.toFixed(2) : 'N/A');

  return (
    <div className='cards'>
      {cardData.map(({ key, heading, backgroundColor, icon }) => (
        <Card
          key={key}
          heading={heading}
          value={formatValue(dashboardData[key])}
          backgroundColor={backgroundColor}
          icon={icon}
        />
      ))}
    </div>
  );
};

const Card = ({ heading, value, backgroundColor, icon }) => (
  <div className='card' style={{ backgroundColor }}>
    <div className='card-icon'>{icons[icon] || <FaChartBar size={24} />}</div>
    <div className='card-content'>
      <p className='card-heading'>{heading}</p>
      <p className='card-value'>{value}</p>
    </div>
  </div>
);

export default Shop;
