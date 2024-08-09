import React from 'react'
import { NavLink } from "react-router-dom";
import "./Home.css"

function Home() {
  return (
    <>
      <div className='home_buttons'>


        <div className='btn btnTilawat'>
          <NavLink to="/tilawat" className="navlink">
            Tilawat
          </NavLink>
        </div>
        <div className='btn btnBayan'>
          <NavLink to="/bayan" className="navlink">
            Bayan
          </NavLink>
        </div>
        <div className='btn btnTafheem'>
          <NavLink to="/tafheem" className="navlink">
            Tafheem
          </NavLink>
        </div>
      </div>
      


    </>
  )
}

export default Home