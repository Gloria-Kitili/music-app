import React from "react";
import Row from "./Row";
import '../css/Home.css'

function Home({ handleSearch, search, albums }){


  const popular = albums.filter(album => album.rating > 7)

  const pop = albums.filter(album => album.genre.toLowerCase().includes("pop"))

  const latin = albums.filter(album => album.genre.toLowerCase().includes("latin"))

  const reggaeton = albums.filter(album => album.genre.toLowerCase().includes("reggaeton"))

  const rnb = albums.filter(album => album.genre.toLowerCase().includes("r&b"))

  const disco = albums.filter(album => album.genre.toLowerCase().includes("disco"))

  const rap = albums.filter(album => album.genre.toLowerCase().includes("rap"))

  const rock = albums.filter(album => album.genre.toLowerCase().includes("rock"))


    return(
          <div className="body">
      
            <form action="" className="searchbar">
                <input type="search" required name="search" value={search} onChange={handleSearch}/>
                <i className="fa fa-search" aria-hidden="true"><svg style ={{marginTop: '-50%', height: '48px', width: '20px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></i>
            </form>

                <Row title="Popular Albums" albums={popular} />
                <Row title="Rap" albums={rap} />
                <Row title="R&amp;B" albums={rnb} />
                <Row title="Pop" albums={pop} />
                <Row title="Reggaeton" albums={reggaeton} />                
                <Row title="Latin" albums={latin} />
                <Row title="Rock" albums={rock} />              
                <Row title="Disco" albums={disco} />                
                
            </div>
    )
}

export default Home;