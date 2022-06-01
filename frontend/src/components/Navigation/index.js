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
      <div>
        <ProfileButton user={sessionUser}/>
        <NavLink to="/" onClick={logout}>Log Out</NavLink>
      </div>
    );
  } else {
    sessionLinks = (
      <div >
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <ul >
      <li  style={{listStyleType: "none"}}>
        <NavLink exact to="/">Home</NavLink>

        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
