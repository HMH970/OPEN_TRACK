import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import * as sessionActions from "../../store/session"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-div">
        <ProfileButton user={sessionUser}/>
        <NavLink to="/" className="nav-buttons"onClick={logout}>Log Out</NavLink>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="nav-div">
        <LoginFormModal />
        <NavLink to="/signup" className="nav-buttons">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <ul className="nav-ul">
      <li  className="nav-li" style={{listStyleType: "none"}}>
        <NavLink exact to="/" className="nav-buttons">Home</NavLink>
      </li>
      <li className="nav-li">
        Open-Track
      </li>
      <li className="nav-li">
      {isLoaded && sessionLinks}
      </li>

    </ul>
  );
}

export default Navigation;
