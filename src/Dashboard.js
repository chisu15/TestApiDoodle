import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
