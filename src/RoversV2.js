import React from "react";
import { NavLink, Outlet } from 'react-router-dom';

function Rovers({ manifests }) {
  let style = ({ isActive }) => ({
    margin: "1rem 1rem",
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <>
      <h2>Rovers</h2>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        {manifests.map((rover) => (
          <NavLink style={style} key={rover.name} to={rover.name.toLowerCase()}>{rover.name}</NavLink>
        ))}
        <Outlet />
      </nav>
    </>
  );
}

export default Rovers;