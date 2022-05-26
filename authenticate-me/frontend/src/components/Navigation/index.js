import { BrowserRouter, Route, NavLink } from "react-router-dom";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Navigation.css";
import ProfileButton from "./ProfileButton";

export default function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <ul className="Nav_ul">
        <NavLink to="/" exact={true}>
          Home
        </NavLink>
        {!sessionUser && (
          <>
            <NavLink to="/login" className="login_signup" id="login-button">
              Log In
            </NavLink>
            <NavLink to="/signup" className="login_signup" id='signup-button'>
              Sign Up
            </NavLink>
            <ProfileButton></ProfileButton>
          </>
        )}
        {sessionUser && (
            <>
                <NavLink to="/logout" id="logout-button">
                    Log Out
                </NavLink>
            </>
        )}
      </ul>
    </>
  );
}
