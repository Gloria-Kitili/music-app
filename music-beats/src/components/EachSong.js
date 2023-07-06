import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube'
import SongBanner from "./SongBanner";
import SongVideo from "./SongVideo";
import "../css/EachSong.css"
import SongVideoForm from "./SongVideoForm";

const EachSong = ( { user } ) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [song, setSong] = useState([])
  const [songVideos, setSongVideos] = useState([])
  const { id } = useParams();

  const opts = {
      height: '400',
      width: '50%',
      playerVars: {            
          autoplay: 0,  //indicates whether the video should start playing automatically when the player loads or not.
      },
  };

  useEffect(() => {
    fetch(`https://railsapp-soundscape.onrender.com/songs/${id}`)
    .then((r) => r.json())
    .then(song => {
      setSong(song);
      setIsLoaded(true)
      setSongVideos([...song.song_videos])
  })
}, [id])

// console.log(song.song_videos);


if (!isLoaded) return <h2 className='loading'>Loading...</h2>

let videoId
song.music_video.startsWith("https://youtu.be") ? videoId = song.music_video.slice(17, 28) : videoId = song.music_video.slice(32, 43)


function addSongVideos(newVideo) {
  setSongVideos([...songVideos, newVideo])
}

function onHandleDelete(id) {
  const updatedSongVideos = songVideos.filter(songVideo => songVideo.id !== id)
  setSongVideos(updatedSongVideos) 
}

const songVideoArray = songVideos.map(songVideo => <SongVideo key={songVideo} songVideo={songVideo} videoId={videoId} opts={opts} onHandleDelete={onHandleDelete} users={user}/>)


  return (
    <div className="song_body">      
      <SongBanner song={song} />
      <div className="song_about">
        <p>{song.about}</p>
      </div>
      <YouTube videoId={videoId} opts={opts} className="song_video"/>
      

        <div className='add-cover'>
          { user ? 
            <div>
              <h1>Add a Live Performance</h1> 
              <SongVideoForm id={id} user={user} addSongVideos={addSongVideos}/> 
            </div>
            :
            <h1>Sign Up to Add a Live Performance</h1> } 
        </div>
      
      
      <div>
          {songVideoArray}
      </div>     
    </div>
  );
};

export default EachSong;