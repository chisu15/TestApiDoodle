import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar'; // Import Sidebar
import Dashboard from './Dashboard';
import CreateMusic from './CreateMusic';
import CreateAlbum from './CreateAlbum';
import EditMusic from './EditMusic';
import EditAlbum from './EditAlbum';
import MusicList from './MusicList';
import AlbumList from './AlbumList';
import Profile from './Profile';
import Login from './Login';
import UserList from './UserList'; // Import UserList
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Navbar />
        <Sidebar /> {/* Add Sidebar component */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-music" element={<CreateMusic />} />
            <Route path="/create-album" element={<CreateAlbum />} />
            <Route path="/edit-music/:id" element={<EditMusic />} />
            <Route path="/edit-album/:id" element={<EditAlbum />} />
            <Route path="/music-list" element={<MusicList />} />
            <Route path="/album-list" element={<AlbumList />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
