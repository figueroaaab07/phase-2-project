import React from "react";
import { Outlet, Link } from "react-router-dom";

function Logger({ log, setLog }) {
  console.log(log);
  const logsToDisplay = log?.map((url) => {
    return (
      <tr key={url.id}>
        <td>{url.id}</td>
        <td>{url.src}</td>
      </tr>
    )
  });
  return (
    <>
      <div className="row-tab">
        <div className="column-tab">
          <table>
            <tbody>
              <tr>
                <th>NASA Photo ID</th>
                <th>Photo Link</th>
              </tr>
              {logsToDisplay}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Logger;
