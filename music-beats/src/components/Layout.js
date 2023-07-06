import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


export default function Layout({ user, setUser}) {
    return(
        <div>
            <Navbar user = {user} setUser = {setUser}/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}