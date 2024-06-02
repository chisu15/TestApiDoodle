import React, { useEffect, useState } from 'react';
import axios from 'axios';
import XRegExp from 'xregexp';
import './AlbumList.css';
import { Link } from 'react-router-dom';

const AlbumList = () => {
  const [albumList, setAlbumList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);

  const fetchAlbums = async () => {
    axios.get('https://music-web-orcin.vercel.app/api/v1/album')
      .then(response => {
        console.log(response.data.data); // Log the response data
        setAlbumList(response.data.data);
        setFilteredAlbumList(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching album list:', error);
      });
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    const regex = XRegExp(searchTerm, 'i');
    const results = albumList.filter(album =>
      XRegExp.test(album.title, regex) || XRegExp.test(album.artist, regex)
    );
    setFilteredAlbumList(results);
  }, [searchTerm, albumList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://music-web-orcin.vercel.app/api/v1/album/${id}`);
      fetchAlbums();
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  // Handle loading state
  if (!Array.isArray(albumList)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="album-list-container">
      <h2>Album List</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title or artist"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <Link to="/create-album" className="create-button">Create New Album</Link>
      </div>
      <table className="album-list-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlbumList.length > 0 ? (
            filteredAlbumList.map(album => (
              <tr key={album._id}>
                <td><img src={album.coverImageUrl} alt={album.title} className="cover-image" /></td>
                <td>{album.title}</td>
                <td>{album.artist}</td>
                <td>{album.genre}</td>
                <td>
                  <Link to={`/edit-album/${album._id}`} className="edit-link">Edit</Link>
                  <button onClick={() => handleDelete(album._id)} className="delete-link">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-album-found">No albums found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumList;
