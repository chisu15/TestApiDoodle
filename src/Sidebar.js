import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>SND WEB</h1>
      <NavLink exact to="/dashboard" className="sidebar-link" activeClassName="active">
        Dashboard
      </NavLink>
      <NavLink to="/music-list" className="sidebar-link" activeClassName="active">
        Music List
      </NavLink>
      <NavLink to="/album-list" className="sidebar-link" activeClassName="active">
        Album List
      </NavLink>
      <NavLink to="/user-list" className="sidebar-link" activeClassName="active">
        User List
      </NavLink>
      <NavLink to="/login" className="sidebar-link" activeClassName="active">
        Login
      </NavLink>
      <NavLink to="/profile" className="sidebar-link" activeClassName="active">
        Profile
      </NavLink>
    </div>
  );
};

export default Sidebar;
