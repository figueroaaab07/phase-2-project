import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Rover from "./RoverBak";

function Rovers() {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2>Rovers</h2>
      <ul>
        <li>
          <Link to={`${url}/opportunity`}>Opportunity</Link>
        </li>
        <li>
          <Link to={`${url}/spirit`}>Spirit</Link>
        </li>
        <li>
          <Link to={`${url}/curiosity`}>Curiosity</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a rover.</h3>
        </Route>
        <Route path={`${path}/:roverId`}>
          <Rover />
        </Route>
      </Switch>
    </div>
  );
}

export default Rovers;
