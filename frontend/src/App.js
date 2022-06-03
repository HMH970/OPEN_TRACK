// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/index";
import OneTrack from "./components/TrackDetailPage";
import CreateTrackFormPage from "./components/CreateTrackPage/index"
import TrackDetailPage from "./components/TrackDetailPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="tracks/:trackId">
            <OneTrack />
          </Route>
          <Route  path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/tracks/new">
            <CreateTrackFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
