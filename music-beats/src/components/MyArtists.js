import React from 'react'
import { useEffect, useState } from 'react';
import MyArtistPage from './MyArtistPage';

const MyArtists = ( { user } ) => {

const [userArtists, setUserArtists] = useState([])

  useEffect(() => {
      fetch(`https://railsapp-soundscape.onrender.com//users/${user.id}`)
      .then(res => res.json())
      .then(user => setUserArtists(user.user_artists))
  }, [user.id])

  function onDeleteUserArtist(id) {
    const deleted = userArtists.filter(userArtist => userArtist
    .id !== id)
    setUserArtists(deleted) 
  }

  return (
    <div className="all_artists_body">
      <h1>My Artists</h1>
        <div className="albums_container">
          {userArtists.map(userArtist => <MyArtistPage key = {userArtist.id} userArtist={userArtist} onDeleteUserArtist={onDeleteUserArtist}/>)}
        </div>
    </div>
  );
};

export default MyArtists;