import React from 'react'
import { useState } from "react";

import { NavLink } from "react-router-dom";
import '../css/AlbumPage.css'

function AlbumPage({ album, user}){
    const {id, image, title} = album
    
  const [liked, setLiked] = useState(false) 

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const likedAlbum = {
    user_id: user ? user.id : 1, album_id: album.id
  }

  function handleAddAlbum() {
    fetch('https://railsapp-soundscape.onrender.com/user_albums', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(likedAlbum)
    })
    setLiked(true)
  }


  let selectedAlbumId;    

  user ? selectedAlbumId = user.user_albums.map(userAlbum => userAlbum.album).map(userAlbum => userAlbum.id) : selectedAlbumId = []


    return(
        <div className="albumpage_container">

        <NavLink  to={`/albums/${album.id}`}>
          <img 
                key={id} 
                src={image} 
                alt={title}
                className="albumpage_image"/>
        </NavLink>
  
        <div className="albumpage_info">
  
          <div className="column_one">
            <NavLink  to={`/albums/${album.id}`}>
              <h3>{truncate(album.title, 14)}</h3>
            </NavLink>
              
          </div>
  
          <div className="column_two">
  
            {user ? 
            
              selectedAlbumId.indexOf(id) !== -1 || liked ? <i className="fa-solid fa-heart albumheart liked" onClick={handleAddAlbum}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg></i> : <i className="fa-solid fa-heart albumheart" onClick={handleAddAlbum}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg></i> 
  
              :
  
              null
          
            }
  
          </div>
  
        </div>
    </div>
    
    )
}

export default AlbumPage;