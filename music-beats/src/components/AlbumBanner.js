import React from 'react'
import "../css/AlbumBanner.css";

const AlbumBanner = ( { album }) => {

  const { title, image } = album




  return (
    
    <header className="banner"
           style={{backgroundImage: `url("${image}")`}}
      >
        <div className="artist_name">
            <h1>{title}</h1>
        </div>

        <div className="banner--fadeBottom" />
    </header>
    
    
  )
};

export default AlbumBanner;