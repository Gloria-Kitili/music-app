import React from 'react'
import { useEffect, useState } from 'react';
import MySongRow from './MySongRow';
import '../css/MySongs.css'

const MySongs = ( { user } ) => {

const [userSongs, setUserSongs] = useState([])

  useEffect(() => {
      fetch(`https://railsapp-soundscape.onrender.com/users/${user.id}`)
      .then(res => res.json())
      .then(user => setUserSongs(user.user_songs))
  }, [user.id])

  function onDeleteUserSong(id) {
    const deleted = userSongs.filter(userSong => userSong
    .id !== id)
    setUserSongs(deleted) 
  }

  return (
    <div className="my_songs_container">
      <h1 className="my_songs_header">My Songs</h1>
        <div className="albums_container">
          <ol className="album_list_item">
              {userSongs.map(userSong => <li><MySongRow key = {userSong.id} userSong={userSong} onDeleteUserSong={onDeleteUserSong}/></li>)}
              
          </ol> 
          
        </div>
    </div>
  );
};

export default MySongs;