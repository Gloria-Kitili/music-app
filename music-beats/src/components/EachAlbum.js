import React from 'react'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumBanner from "./AlbumBanner";
import Songs from "./Songs";
import "../css/EachAlbum.css";

const EachAlbum = ( { user } ) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [album, setAlbum] = useState([])
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://railsapp-soundscape.onrender.com/albums/${id}`)
    .then((res) => res.json())
    .then(album => {
      setAlbum(album);
      setIsLoaded(true)
  })
}, [id])


if (!isLoaded) return <h2 className='loading'>Loading...</h2>

const {year, label, artist} = album

  return (

    <div className="album_body">
      <AlbumBanner album={album} artist={artist}/>
      <ol className="album_list_item">
        {album.songs.map(song =>
          <li ><Songs key = {song.id} song={song} artist={artist} user={user}/></li>
        )}
      </ol>
      <p className="album_details">{year}, {label}</p>   
    </div>
  );
};

export default EachAlbum;
