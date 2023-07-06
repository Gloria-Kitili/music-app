import React from 'react'
import YouTube from 'react-youtube'
import CommentForm from './CommentForm';
import Comment from './Comment';
import { useState, useEffect } from "react";
import "../css/SongVideo.css"

const SongVideo = ( { songVideo, opts, onHandleDelete, users } ) => {
  const [songVideoComments, setSongVideoComments] = useState([])
  const { id, title, video_url, comments, user } = songVideo

  let videoId
  video_url.startsWith("https://youtu.be") ? videoId = video_url.slice(17, 28) : videoId = video_url.slice(32, 43)

  useEffect(() => {
      fetch(`https://railsapp-soundscape.onrender.com/song_videos/${id}`)
      .then((r) => r.json())
      .then(songVideo => {
          setSongVideoComments([...songVideo.song_video_comments])
      })
  }, [id])
// console.log(songVideoComments);

  function handleDelete() {
    fetch(`https://railsapp-soundscape.onrender.com/song_videos/${id}`, {
      method: 'DELETE'
    });
    onHandleDelete(id)
  }

  function onAddComment(newComment){
      setSongVideoComments([...songVideoComments, newComment])
  }

  function handleDeleteComment(id) {
    const deleteComment = songVideoComments.filter((comment) => comment.id !== id)
    setSongVideoComments(deleteComment) 
    fetch(`https://railsapp-soundscape.onrender.com/song_video_comments/${id}`, {
        method:'DELETE'
      })
  }

  function onUpdateComment(updatedSongVideoComment) {
  const updatedsongVideoComments = songVideoComments.map(songVideoComment => {
    if (songVideoComment.id === updatedSongVideoComment.id) {
      return updatedSongVideoComment
    } else {
      return songVideoComment
    }
  })
  setSongVideoComments(updatedsongVideoComments)
  }

  let displayDelete
  users && users.id === user.id ? 
    displayDelete = <button className='x-btn' onClick={handleDelete}>x</button>
    :
    displayDelete = null

  return (
    <div>
      <div className='vid-post-info'>
        <h2>{displayDelete}{title}</h2>        
        <p><b>Review:</b> {comments}</p>  
      </div>

    
   
     
      <YouTube videoId={videoId} opts={opts} className="song_video"/>
      
      <h2 className='add-comment'>Comments:</h2>
      {songVideoComments.map(songVideoComment => <Comment key={songVideoComment} songVideoComment={songVideoComment} handleDeleteComment={handleDeleteComment} onUpdateComment={onUpdateComment} users={users} />)}

      <CommentForm onAddComment={onAddComment} songVideoId={id} users={users} />

    </div>
  );
};

export default SongVideo;