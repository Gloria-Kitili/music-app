import YouTube from 'react-youtube'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../css/Songs.css";

const MySongRow = ( { userSong, onDeleteUserSong } ) => {
    // console.log(userSong);

    const [videoUrl, setVideoUrl] = useState("")
    const [artist, setArtist] = useState([])
    const { id, song } = userSong
    const { artist_id } = song

    useEffect(() => {
        fetch(`https://railsapp-soundscape.onrender.com/artists/${artist_id}`)
        .then(res => res.json())
        .then(artist => setArtist(artist))
    }, [artist_id])

    const opts = {
        height: '350',
        width: '50%',
        playerVars: {
             autoplay: 1,
        },
    };

    function handleClick(song){
        let videoId
        song.music_video.startsWith("https://youtu.be") ? videoId = song.music_video.slice(17, 28) : videoId = song.music_video.slice(32, 43)
        
        if (videoUrl) {
            setVideoUrl('')
        } else {
            setVideoUrl(videoId)
            }
    }

    function handleDeleteUserSong() {
        fetch(`https://railsapp-soundscape.onrender.com/user_songs/${id}`, {
            method:'DELETE'
          })
        onDeleteUserSong(id)
      }


    return (
        <div className="songRow">
          <div className="songRow__info">

            <NavLink to={`/songs/${song.id}`}>
                <h1>{song.title}</h1>
            </NavLink>

            <i className="fa-solid fa-play" onClick={() => handleClick(song)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg></i>
            <i className="fa-solid fa-minus" onClick={handleDeleteUserSong}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg></i>
            
            {videoUrl && <YouTube videoId={videoUrl} opts={opts} className="music_video"/>}

            <NavLink to={`/artists/${artist.id}`}>
                <p>{artist.name}</p>
            </NavLink>


          </div>
        </div>
      );
  };
  
  export default MySongRow;