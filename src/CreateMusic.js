import './CreateMusic.css';
// src/components/MusicForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateMusic = () => {
  const [musicData, setMusicData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: '',
    fileUrl: null,
    coverImageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMusicData({
      ...musicData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setMusicData({
      ...musicData,
      fileUrl: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', musicData.title);
    formData.append('artist', musicData.artist);
    formData.append('album', musicData.album);
    formData.append('genre', musicData.genre);
    formData.append('duration', musicData.duration);
    formData.append('fileUrl', musicData.fileUrl);
    formData.append('coverImageUrl', musicData.coverImageUrl);
    console.log(formData);
    try {
      const response = await axios.post('https://music-web-orcin.vercel.app/api/v1/music', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.status === 200) {
        alert('Music created successfully!');
      }
    } catch (error) {
      console.error('There was an error creating the music!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={musicData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Artist:</label>
        <input type="text" name="artist" value={musicData.artist} onChange={handleChange} required />
      </div>
      <div>
        <label>Album:</label>
        <input type="text" name="album" value={musicData.album} onChange={handleChange} />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" name="genre" value={musicData.genre} onChange={handleChange} required />
      </div>
      <div>
        <label>Duration (seconds):</label>
        <input type="number" name="duration" value={musicData.duration} onChange={handleChange} required />
      </div>
      <div>
        <label>File:</label>
        <input type="file" name="fileUrl" onChange={handleFileChange} required />
      </div>
      <div>
        <label>Cover Image URL:</label>
        <input type="text" name="coverImageUrl" value={musicData.coverImageUrl} onChange={handleChange} required />
      </div>
      <button type="submit">Create Music</button>
    </form>
  );
};
export default CreateMusic;
