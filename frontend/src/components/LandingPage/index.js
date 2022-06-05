import './LandingPage.css'
import React, {useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
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

const loadTrack = (e) => {

        e.preventDefault();
        dispatch(trackActions.getOneTrack());

}

    useEffect(() => {
        dispatch(trackActions.getTracks())
        return () => {
            dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
        }
    }, [dispatch])

    return (
        <div className="all-tracks-container" style={{backgroundColor: "lightgray", border: "2px solid black", display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
            <div>

            </div>
            {trackArr.length > 0 && trackArr?.map((track) => {
                // let url = Object.values(track.Images)[0].url
                return (
                    <div key={track.id} className="all-tracks-div" style={{backgroundColor: "lightgray", flexDirection: 'row'}}>
                        <div className="track-detail"style={{border: "1px dotted rgba(155, 255, 200, .7)",listStyleType: "none", display: "flex", flexDirection: "column", justifyContent: "center", width: "80%", alignItems: "center"}}>
                            <Link to={`tracks/${track.id}`}  className="track-detail-img-container">
                                <img style={{backgroundImage: `url(${urlArr[track.id -1]})`, height: "250px", width: "250px", borderRadius: "10px", boxShadow: "5px 5px 5px rgba(155, 255, 200, 0.5)"}}src={`${urlArr[track.id -1]}`}/>
                            </Link>
                            <h2 className="track-detail-h2">{`${track?.name}`}</h2>
                            <div className="track-details-con">{`${track?.address}`}</div>
                            <div className="track-details-con">{`${track?.city}`}, {`${track?.state}`} {`${track?.country}`}</div>
                            <div className="track-details-con">{`${track?.phone}`}</div>
                            <div className="track-details-con">{`${track?.web}`}</div>
                            <div className="track-details-con">${`${track?.price}`}</div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
export default LandingPage;
