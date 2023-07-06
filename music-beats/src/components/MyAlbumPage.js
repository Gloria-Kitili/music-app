import React from 'react'
import { NavLink } from "react-router-dom";
import '../css/AlbumPage.css'

const MyAlbumPage = ( { userAlbum, onDeleteUserAlbum } ) => {

  const { id, album } = userAlbum

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function handleDeleteUserAlbum() {
    fetch(`https://railsapp-soundscape.onrender.com/user_albums/${id}`, {
        method:'DELETE'
      })
    onDeleteUserAlbum(id)
  }

  return (
    <div className="albumpage_container">
        <img 
            key={album.id} 
            src={album.image} 
            alt={album.title}
            className="albumpage_image"/>
      <div className="albumpage_info">

      <div className="column_one">
          <NavLink to={`/albums/${album.id}`}>
            <h3>{truncate(album.title, 14)}</h3>
          </NavLink>
        </div>
        <div className="column_two">
          <i className="fa-solid fa-minus" onClick={handleDeleteUserAlbum}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg></i>
        </div>
     
      </div>

  </div>
  );
};



export default MyAlbumPage;