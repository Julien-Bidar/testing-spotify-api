import React from "react";
import GlobalStyles from "../../GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./landingPage";
import Home from "../home/home";

function App() {
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
