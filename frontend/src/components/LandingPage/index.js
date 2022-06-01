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
    let Images;
    let urlArr = []
    trackArr.map((track) => {
        Images = track.Images
        let arr = Object.values(Images)
        urlArr.push(arr[0].url)

        return urlArr;
    })

    useEffect(() => {
        dispatch(trackActions.getTracks())
        return () => {
            dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
        }
    }, [dispatch])

    return (
        <>
            {trackArr.length > 0 && trackArr?.map((track) => {
                // let url = Object.values(track.Images)[0].url
                return (
                    <div key={track.id} className="all-tracks-div" style={{backgroundColor: "lightgray", display: "flex"}}>
                        <ul className="track-detail-ul"style={{listStyleType: "none"}}> Track Details
                            <li className="track-detail-li">{`${track?.name}`}</li>
                            <li className="track-detail-li">{`${track?.address}`}</li>
                            <li className="track-detail-li">{`${track?.city}`}</li>
                            <li className="track-detail-li">{`${track?.state}`}</li>
                            <li className="track-detail-li">{`${track?.country}`}</li>
                            <li className="track-detail-li">{`${track?.phone}`}</li>
                            <li className="track-detail-li">{`${track?.web}`}</li>
                            <li className="track-detail-li">{`${track?.price}`}</li>
                            <div className="track-image" style={{backgroundImage: `url(${urlArr[track.id -1]})`, height: "250px", width: "250", borderRadius: "10px", boxShadow: "5px 5px 5px rgba(155, 255, 200, 0.5)", margin: "0px auto", padding: "25px 25px 25px 25px"}}></div>
                        </ul>

                    </div>
                )
            })}
        </>
    )
}
export default LandingPage;
