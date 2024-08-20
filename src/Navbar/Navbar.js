import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
        <NavLink to="/" className="nav__logo">
          Audio Quran
        </NavLink>
        <div className={`nav__menu ${menuOpen ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/BookMark" className="nav__link" onClick={toggleMenu}>
                Bookmarks
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/bayan" className="nav__link" onClick={toggleMenu}>
                Chains
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/tafheem" className="nav__link" onClick={toggleMenu}>
                Settings
              </NavLink>
            </li>
          </ul>


          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      

    </header>
  );
};

export default Navbar;
