import React from "react";
import { NavLink, Outlet } from 'react-router-dom';

function Rovers({ opportunityData, spiritData, curiosityData, manifests, handleDateChange, handleDateSubmit, date, setDate, isValidDate, setIsValidDate, dateData, handleRadioChange, photos }) {
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
      </nav>
      {/* <ul>
        {manifests.map((rover) => (
          <li key={rover.name}>
            <Link to={rover.name.toLowerCase()}>{rover.name}</Link>
          </li>
          ))}
      </ul> */}
      <Outlet />
    </>
  );
}

export default Rovers;