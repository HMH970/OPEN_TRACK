import './LandingPage.css'
import React, {useState, useEffect}from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, Redirect} from 'react-router-dom';
import * as trackActions from "../../store/tracks"
import * as sessionActions from "../../store/session"


function LandingPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const allTracks = useSelector((state) => state.track)
    const sessionUser = useSelector((state) => state.session.user)

    const trackArr = Object.values(allTracks);

    useEffect(() => {
        dispatch(trackActions.getTracks())
        return () => {
            dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
        }
    }, [dispatch])

    return (
        <>
            {trackArr.length > 0 && trackArr.map((track) => {
                return (
                    <div key={track.id} className="all-tracks-div">
                        <ul> Track Details
                            <li>{`${track?.address}`}</li>
                            <li>{`${track?.name}`}</li>
                            <li>{`${track?.city}`}</li>
                            <li>{`${track?.state}`}</li>
                            <li>{`${track?.country}`}</li>
                            <li>{`${track?.phone}`}</li>
                            <li>{`${track?.web}`}</li>
                            <li>{`${track?.price}`}</li>
                            <li>{typeof track.Images}</li>
                            {/* <li style={{backgroundImage: `${track?.Images["0"]}`}}>img</li> */}
                            <img></img>
                        </ul>

                    </div>
                )
            })}
        </>
    )
}
export default LandingPage;
