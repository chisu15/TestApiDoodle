import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateAlbum.css';

const CreateAlbum = () => {
  const [title, setTitle] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [status, setStatus] = useState('public');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [songs, setSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const response = await axios.get('https://music-web-orcin.vercel.app/api/v1/music');
        setAllSongs(response.data.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchAllSongs();
  }, []);

  const handleSongChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSongs((prevSongs) => {
      if (isChecked) {
        return [...prevSongs, value];
      } else {
        return prevSongs.filter((song) => song !== value);
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title,
      createdBy,
      status,
      coverImageUrl,
      songs // Sending songs array directly
    };

    // Log formData to check what is being sent
    console.log('FormData:', formData);

    try {
      const response = await axios.post('https://music-web-orcin.vercel.app/api/v1/album', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
      alert('Album created successfully!');
      setTitle('');
      setCreatedBy('');
      setStatus('public');
      setCoverImageUrl('');
      setSongs([]);
    } catch (error) {
      console.error('Error creating album:', error);
      alert('Error creating album');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Album</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="createdBy">Created By:</label>
          <input
            type="text"
            id="createdBy"
            name="createdBy"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="coverImageUrl">Cover Image URL:</label>
          <input
            type="text"
            id="coverImageUrl"
            name="coverImageUrl"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="songs">Songs:</label>
          <div className="songs-list">
            {allSongs.map((song) => (
              <div key={song._id} className="song-item">
                <input
                  type="checkbox"
                  id={song._id}
                  name="songs"
                  value={song._id}
                  onChange={handleSongChange}
                />
                <label htmlFor={song._id}>{song.title} ({song.genre})</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Create Album</button>
      </form>
    </div>
  );
};

export default CreateAlbum;
