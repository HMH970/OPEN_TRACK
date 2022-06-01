import React, {useEffect, useState} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import * as sessionActions from "../../store/session"
import * as trackActions from "../../store/tracks.js"
import { useEffect } from 'react';

function Tracks(){
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date())
}

export default Tracks;
