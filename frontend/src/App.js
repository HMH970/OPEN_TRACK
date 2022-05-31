// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="track-type-slider-container">
        <ul id="track-type-slider-ul" style={{"display": "flex", "listStyle": "none", "margin": "10px"}}>
          <li className="track-type-slider-li" >Rental Karts</li>
          <li className="track-type-slider-li" >Private Kart</li>
          <li className="track-type-slider-li" >Auto</li>
          <li className="track-type-slider-li" >MotoGp</li>
          <li className="track-type-slider-li" >Drifting</li>
        </ul>
      </div>
      <div className="track-list-container">

      </div>
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
