
import React, {useState, useEffect}from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, Redirect, useParams} from 'react-router-dom';
import * as trackActions from "../../store/tracks"
import * as sessionActions from "../../store/session"


function TrackDetailPage() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const onetracks = useSelector((state) => state.track)
    const sessionUser = useSelector((state) => state.session.user)
console.log(onetracks)
    const trackArr = Object.values(onetracks);
    let Images;
    let urlArr = []
    trackArr.map((track) => {
        Images = track.Images
        let arr = Object.values(Images)
        urlArr.push(arr[0].url)

        return urlArr;
    })

    useEffect(() => {
        console.log("USE EFFECT")
        dispatch(trackActions.getOneTrack(id))
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
                        <ul className="track-detail-ul"style={{listStyleType: "none"}}>
                            <li className="track-detail-li">{`${track?.name}`}</li>
                            <img alt="alt"style={{backgroundImage: `url(${urlArr[track.id -1]})`, height: "250px", width: "250", borderRadius: "10px", boxShadow: "5px 5px 5px rgba(155, 255, 200, 0.5)"}}src={`${urlArr[track.id -1]}`}/>
                            <li className="track-detail-li">{`${track?.address}`}</li>
                            <li className="track-detail-li">{`${track?.city}`}, {`${track?.state}`} {`${track?.country}`}</li>
                            <li className="track-detail-li">{`${track?.phone}`}</li>
                            <li className="track-detail-li">{`${track?.web}`}</li>
                            <li className="track-detail-li">{`${track?.price}`}</li>
                        </ul>

                    </div>
                )
            })}
        </>
    )
}
export default TrackDetailPage;
