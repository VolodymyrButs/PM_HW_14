import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import styled from "styled-components";
import { Photo } from "./components/photo/Photo";
import { Photos } from "./components/photos/Photos";
import { Album } from "./components/album/Album";
const App = () => {
  return (
    <div className="App">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/album/:id" children={<Album />} />
          <Route path="/photo/:id" children={<Photo />} />
          <Route path="/">
            <Photos />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
