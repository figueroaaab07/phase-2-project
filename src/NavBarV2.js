import React from "react";
import { NavLink } from "react-router-dom";

let style = ({ isActive }) => ({
  margin: "1rem 1rem",
  fontWeight: isActive ? 'bold' : 'normal',
});

function NavBar() {
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '1rem',
      }}
    >
      <NavLink
        style={style}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={style}
        to="/about"
      >
        About
      </NavLink>
      <NavLink
        style={style}
        to="/rovers"
      >
        Rovers
      </NavLink>
      <NavLink
        style={style}
        to="/logger"
      >
        Logger
      </NavLink>
    </nav>
  );
}

export default NavBar;