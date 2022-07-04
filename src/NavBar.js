import React from "react";
import { NavLink } from "react-router-dom";

// const linkStyles = {
//   display: "inline-block",
//   width: "60px",
//   padding: "12px",
//   margin: "0 6px 6px",
//   background: "blue",
//   textDecoration: "none",
//   color: "white",
// };

// const activeStyle = {
//   display: "inline-block",
//   width: "60px",
//   padding: "12px",
//   margin: "0 6px 6px",
//   background: "darkblue",
//   textDecoration: "none",
//   color: "white",
// };

// let style = ({ isActive }) => {
//   return {
//     display: "inline-block",
//     margin: "1rem 1rem",
//     color: isActive ? "red" : "",
//   };
// }

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
    </nav>
  );
}

export default NavBar;