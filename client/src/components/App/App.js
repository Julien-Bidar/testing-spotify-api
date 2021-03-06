import React from "react";
import GlobalStyles from "../../GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./landingPage";
//import LandingPage from "./landingPageWithoutServer";
import Home from "../home/home";
import AddRoom from "../setRoom/addRoom";
import Room from "../Room/room";
import Search from "../search/search";
import Player from "../Room/player";
import { useSelector } from "react-redux";

function App() {
  const queue = useSelector((state) => state.queue.items);
  return (
    <>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          {/* sessionAttempt */}
          <Route exact path="/room/">
            <Room />
          </Route>
          {/* sessionAttempt */}
          <Route exact path="/search/">
            <Search />
          </Route>
          <Route exact path="/addroom">
            <AddRoom />
          </Route>
        </Switch>
        {/* sessionAttempt */}
        <Player />
      </Router>
    </>
  );
}

export default App;
