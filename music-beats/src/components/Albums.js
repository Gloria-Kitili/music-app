import React from "react";
import AlbumPage from "./AlbumPage";
import '../css/AlbumPage.css'

function Albums({user, search, handleSearch, albums}){
    return(
        <div className="all_albums_body">

        <form action="" className="searchbar">
          <input type="search" required name="search" value={search} onChange={handleSearch}/>
            <i className="fa fa-search"><svg style ={{marginTop: '-50%', height: '48px', width: '20px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></i>
        </form>
        
        <h1>Albums</h1>
        <div className="albums_container">
        {albums.map(album =>
            <AlbumPage key = {album.id} album={album} user={user} />            
            )}
        </div>
      </div> 
    )
}

export default Albums;