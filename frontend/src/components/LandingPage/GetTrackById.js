import './LandingPage.css'
import React, {useState, useEffect}from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, Redirect} from 'react-router-dom';
import * as trackActions from "../../store/tracks"
import * as sessionActions from "../../store/session"


function oneTrack (pl, id) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const trackOne = useSelector((state) => state.track)
    const sessionUser = useSelector((state) => state.session.user)

console.log(track, id,  "TRACK TRACK TRACK", pl)


    useEffect(() => {
        dispatch(trackActions.getOneTrack())
        return () => {
            dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
        }
    }, [dispatch])

}
