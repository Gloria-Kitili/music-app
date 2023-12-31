import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';

import '../css/Navbar.css'

function Navbar({ user, setUser}){

    const navigate = useNavigate();
    function handleLogout(){
        fetch('http://localhost:4000/logout', {
            method: 'DELETE'
          })
          .then((res) => {
            if (res.ok) {
              setUser(false);
              navigate(`/`); 
              
            }
          });
    }
    return(
        <div className="sidebar">
            <nav  className='nav-menu-items'>
              <div className="heading">
              <p className="spotify"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-spotify"  viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
                          </svg></span>
                </p>
                <p className="music-app"><span>music-app</span></p>
              </div>
             
            { user ? <span className="my_collection">{"Hey, "  +  user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span> : ""}

            { user ?
            <NavLink to='/logout' onClick={ handleLogout }>
            <p><span>Logout</span></p>
            </NavLink>
            :
            <NavLink to='/login'>
                <p><span>Login</span></p>
            </NavLink>
            }

            { user ? null :
            <NavLink to='/signup'>
                <p><span>Signup</span></p>
            </NavLink>
            }

            <NavLink to='/'>
            <p><span>Home</span></p>
            </NavLink>

            <NavLink to='/albums'>
            <p><span>Albums</span></p>
            </NavLink>

            <NavLink to='/artists'>
            <p><span>Artists</span></p>
            </NavLink>

            
            { user ? 
            <div>
              <div className="my_collection">                
                <span>MY PLAYLISTS</span>
              </div>

              <NavLink to='/mysongs'>
                <p><span>My Songs</span></p>
              </NavLink>

              <NavLink to='/myalbums'>
                <p><span>My Albums</span></p>
              </NavLink>
              
              <NavLink to='/myartists'>
                <p><span>My Artists</span></p>
              </NavLink>             

             
            </div> : ""
            }
            </nav>
        </div>
    )
}

export default Navbar;