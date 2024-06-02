import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditMusic.css';

const EditMusic = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: '',
    fileUrl: null,
    coverImageUrl: '',
    public_id: '',
    slug: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://music-web-orcin.vercel.app/api/v1/music/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      fileUrl: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('artist', formData.artist);
      formDataToSend.append('album', formData.album);
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('duration', formData.duration);
      if (formData.fileUrl) {
        formDataToSend.append('fileUrl', formData.fileUrl);
      }
      formDataToSend.append('coverImageUrl', formData.coverImageUrl);
      formDataToSend.append('public_id', formData.public_id);
      formDataToSend.append('slug', formData.slug);

      await axios.patch(`https://music-web-orcin.vercel.app/api/v1/music/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Music updated successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error updating music');
      console.error('Error updating music:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Music</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="album">Album:</label>
          <input
            type="text"
            id="album"
            name="album"
            value={formData.album}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileUrl">Music File:</label>
          <input
            type="file"
            id="fileUrl"
            name="fileUrl"
            onChange={handleFileChange}
          />
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
          <label htmlFor="public_id">Public ID:</label>
          <input
            type="text"
            id="public_id"
            name="public_id"
            value={formData.public_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Music</button>
      </form>
    </div>
  );
};

export default EditMusic;
