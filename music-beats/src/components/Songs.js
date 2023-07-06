import YouTube from 'react-youtube'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../css/Songs.css";

const Song = ( { song, artist, user } ) => {

    const [videoUrl, setVideoUrl] = useState("")
    const [liked, setLiked] = useState(false)

    const opts = {
        height: '350',
        width: '50%',
        playerVars: {            
            autoplay: 1,  //indicates whether the video should start playing automatically when the player loads or not.
        },
    };

    function handleClick(song){
        let videoId;
        song.music_video.startsWith("https://youtu.be") ? videoId = song.music_video.slice(17, 28) : videoId = song.music_video.slice(32, 43)
        
        if (videoUrl) {
            setVideoUrl('')  //set video url to null if play button is clicked twice
        } else {
            setVideoUrl(videoId)
            }
    }

    const formData = {
        user_id: user ? user.id : 1,
        song_id: song.id
      }
    
      function handleAddSong() {
        fetch('https://railsapp-soundscape.onrender.com/user_songs', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData)
        })
        setLiked(true)
      }

      let selectedSongId  

      user ? selectedSongId = user.user_songs.map(userSong => userSong.song).map(userSong => userSong.id) : selectedSongId = []
    

    return (
        <div className="songRow">
          <div className="songRow__info">

            <NavLink to={`/songs/${song.id}`}>
                <h1>{song.title}</h1>
            </NavLink>

            <i className="fa-solid fa-play" onClick={() => handleClick(song)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg></i>

            {user ? 
          
            selectedSongId.indexOf(song.id) !== -1 || liked ? <i className="fa-solid fa-heart albumheart liked" onClick={handleAddSong}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg></i> : <i className="fa-solid fa-heart albumheart" onClick={handleAddSong}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg></i> 

            :

            null
          
            }

            
            {videoUrl && <YouTube videoId={videoUrl} opts={opts} className="music_video"/>}

            <NavLink to={`/artists/${artist.id}`}>
                <p>{artist.name}</p>
            </NavLink>
  

          </div>
        </div>
      );
  };
  
  export default Song;