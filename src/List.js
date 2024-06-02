import React from 'react';
import MusicList from './MusicList';
import AlbumList from './AlbumList';

const List = () => {
  return (
    <div className="container">
      <h1>Music and Album List</h1>
      <MusicList />
      <AlbumList />
    </div>
  );
};

export default List;
