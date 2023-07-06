import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Albums from "./components/Albums";
import Artists from "./components/Artists";
import EachAlbum from "./components/EachAlbum";
import EachArtist from "./components/EachArtist";
import EachSong from "./components/EachSong";
import MyAlbums from "./components/MyAlbums";
import MyArtists from "./components/MyArtists";
import MySongs from "./components/MySongs";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [search, setSearch] = useState("")
  const [userAlbums, setUserAlbums] = useState([])

 //check if user is authorized after logging in
  useEffect(() => {
    fetch('https://railsapp-soundscape.onrender.com/me')
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
        });
      } else {
        res.json().then( (json) => {
          if (json.errors !== undefined) {
            alert(json.errors);
          }
        });
      }
    })
  },[]);

  useEffect(() => {
    fetch('https://railsapp-soundscape.onrender.com/albums')
    .then(res => res.json())
    .then((albums) => setAlbums(albums))
  }, []);
  // console.log(albums);

  useEffect(() => {
    fetch(`https://railsapp-soundscape.onrender.com/artists`)
    .then((r) => r.json())
    .then(artists => setArtists(artists))
  }, [])
  // console.log(artists);

  function handleSearch(e){
    setSearch(e.target.value)
  }


  const displayAlbums = albums.filter(album => album.title.toLowerCase().includes(search.toLowerCase()))
  const displayArtists = artists.filter(artist => artist.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
   
    <Routes>
      <Route path = '/' element = { <Layout user = {user} setUser = {setUser} />}>
      <Route index element = { <Home  albums = {displayAlbums} handleSearch={handleSearch} search={search} />}/>
      <Route path = '/albums' element = {<Albums user = {user} albums = {displayAlbums} handleSearch={handleSearch} search={search} userAlbums={userAlbums}/>} />
      <Route path = '/albums/:id' element = {<EachAlbum  user = {user} />}  /> 
      <Route path = '/myalbums' element = {<MyAlbums user = {user} userAlbums={userAlbums} setUserAlbums={setUserAlbums}/>} />
      <Route path = '/artists' element = {<Artists user = {user} artists = {displayArtists} handleSearch={handleSearch} search={search} /> } />      
      <Route path = '/artists/:id' element = {<EachArtist user = {user} />} />
      <Route path = '/myartists' element = {<MyArtists user = {user} />} />
      <Route path = 'songs/:id' element = {<EachSong user = {user} />} />    
      <Route path = '/mysongs' element = {<MySongs user = {user} />} />
      </Route>
      
      <Route path = '/signup' element = { <Signup  setUser = {setUser} />} />      
      <Route path = '/login' element = {<Login setUser = {setUser}/>} />
      
      
    </Routes>
    </>
  );
}

export default App;