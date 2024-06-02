import React, { useEffect, useState } from 'react';
import axios from 'axios';
import XRegExp from 'xregexp';
import './MusicList.css';
import { Link } from 'react-router-dom';

const MusicList = () => {
  const [musicList, setMusicList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMusicList, setFilteredMusicList] = useState([]);

  const fetchMusics = async () => {
    axios.get('https://music-web-orcin.vercel.app/api/v1/music')
      .then(response => {
        console.log(response.data.data); // Log the response data
        setMusicList(response.data.data);
        setFilteredMusicList(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching music list:', error);
      });
  };

  useEffect(() => {
    fetchMusics();
  }, []);

  useEffect(() => {
    const regex = XRegExp(searchTerm, 'i');
    const results = musicList.filter(music =>
      XRegExp.test(music.slug, regex) || XRegExp.test(music.artist, regex)
    );
    setFilteredMusicList(results);
  }, [searchTerm, musicList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/music/${id}`);
      fetchMusics();
    } catch (error) {
      console.error('Error deleting music:', error);
    }
  };

  // Handle loading state
  if (!Array.isArray(musicList)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="music-list-container">
      <h2>Music List</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title or artist"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <Link to="/create-music" className="create-button">Create New Music</Link>
      </div>
      <table className="music-list-table">
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
          {filteredMusicList.length > 0 ? (
            filteredMusicList.map(music => (
              <tr key={music._id}>
                <td><img src={music.coverImageUrl} alt={music.title} className="cover-image" /></td>
                <td>{music.title}</td>
                <td>{music.artist}</td>
                <td>{music.genre}</td>
                <td>
                  <Link to={`/edit-music/${music._id}`} className="edit-link">Edit</Link>
                  <button onClick={() => handleDelete(music._id)} className="delete-link">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-music-found">No music found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MusicList;
