import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditAlbum.css';

const EditAlbum = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    createdBy: '',
    status: '',
    coverImageUrl: '',
    songs: []
  });
  const [allSongs, setAllSongs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await axios.get(`https://music-web-orcin.vercel.app/api/v1/album/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    };

    const fetchAllSongs = async () => {
      try {
        const response = await axios.get('https://music-web-orcin.vercel.app/api/v1/music');
        setAllSongs(response.data.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchAlbumData();
    fetchAllSongs();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSongChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFormData((prevState) => {
      const newSongs = isChecked
        ? [...prevState.songs, value]
        : prevState.songs.filter((song) => song !== value);

      return {
        ...prevState,
        songs: newSongs
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://music-web-orcin.vercel.app/api/v1/album/${id}`, formData);
      toast.success('Album updated successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error updating album');
      console.error('Error updating album:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Album</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="createdBy">Created By:</label>
          <input
            type="text"
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
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
            value={formData.coverImageUrl}
            onChange={handleChange}
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
                  checked={formData.songs.includes(song._id)}
                  onChange={handleSongChange}
                />
                <label htmlFor={song._id}>{song.title} ({song.genre})</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Update Album</button>
      </form>
    </div>
  );
};

export default EditAlbum;
