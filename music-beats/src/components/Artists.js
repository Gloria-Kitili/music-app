import React from 'react'
import ArtistPage from "./ArtistPage";
import '../css/Artists.css'


const Artists = ( { user, handleSearch, search, artists } ) => {

  return (
    <div className="all_artists_body">

      <form action="" className="searchbar">
        <input type="search" required name="search" value={search} onChange={handleSearch}/>
          <i className="fa fa-search"><svg style ={{marginTop: '-50%', height: '48px', width: '20px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></i>
      </form>

      <h1>Artists</h1>
      
      <div className="albums_container">
        {artists.map(artist =>
            <ArtistPage key ={artist.id} artist={artist} user={user}/>
          )}
      </div>
    </div>
  );
};

export default Artists;