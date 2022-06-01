import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState} from "react"
import { Modal } from "../../context/Modal"
import { Redirect, useHistory} from "react-router-dom"
import "./LandingPage.css"
import {getTracks} from "../../store/tracks"
import * as sessionActions from "../../store/session"
import * as trackActions from "../../store/tracks"

const LandingPage=() =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const tracks = useSelector((state) => {
        return state.tracks.map(trackId => state.tracks[trackId])
    })
    const [isLoaded, setIsLoaded] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const history = useHistory();

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    if(!tracks) {
        return null;
    }

    return (
       <>
        {tracks.map(track => {
          return   <div>`${track.name}`</div>
        })}
       </>
    )
}
export default LandingPage
