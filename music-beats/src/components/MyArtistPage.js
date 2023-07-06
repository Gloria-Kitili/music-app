
import React from 'react'
import { NavLink } from "react-router-dom";
import '../css/ArtistPage.css'

const MyArtistPage = ( { userArtist, onDeleteUserArtist } ) => {

  const { id, artist } = userArtist

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function handleDeleteUserArtist() {
    fetch(`https://railsapp-soundscape.onrender.com/user_artists/${id}`, {
        method:'DELETE'
      })
    onDeleteUserArtist(id)
  }

  return (
    <div className="artist_thumbnail_container">
        <img 
            key={artist.id} 
            src={artist.image} 
            alt={artist.name}
            className="artist_thumbnail_image"/>
      <div className="artist_thumbnail_info">

      <div className="column_one">
         <NavLink to={`/artists/${artist.id}`}>
          <h3>{truncate(artist.name, 16)}</h3>
        </NavLink>
      </div>
      
      <div className="column_two_artist">
        <i className="fa-solid fa-minus" onClick={handleDeleteUserArtist}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg></i>
      </div>

      </div>
  </div>
  );
};


export default MyArtistPage;