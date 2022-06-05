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
import * as trackActions from "./store/tracks"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

// useEffect(() => {
//   dispatch(trackActions.getTracks())
// }, [dispatch])

// useEffect(() => {
//   dispatch(reviewActions.getAllReviews())
// }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/tracks/new">
            <CreateTrackFormPage />
          </Route>
          <Route path="/tracks/:trackId">
            <OneTrack />
          </Route>
          <Route  path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
