import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, useParams, Route } from "react-router-dom";
import * as trackActions from "../../store/tracks";
import * as sessionActions from "../../store/session";

function OneTrack(pl, id) {
  const { trackId } = useParams();
  console.log(trackId)
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const trackOne = useSelector((state) => state.track);
  const sessionUser = useSelector((state) => state.session.user);
  const trackClone = Object.values(trackOne).slice(0, 1);
  const [editUrl, setEditUrl] = useState("")

  let Images;
  const refreshPage = ()=>{
    window.location.reload();
 }
  let urlArr = [];
  trackClone.map((track) => {
    Images = track.Images;
    let arr = Object.values(Images);
    urlArr.push(arr[0].url);

    return urlArr;
  });

  let trackImgUrl = urlArr[0];

  useEffect(() => {

    dispatch(trackActions.getOneTrack(trackId));

    return () => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    };
  }, [dispatch, trackId]);



  return (
    <div >
      {/* {console.log(trackClone.length)} */}
      {trackClone.length > 0  ?(
        <div className="track-detail-page" style={{padding: "5px 25px 25px 25px", backgroundColor: "lightgray", height: "90%", display: "flex", flexDirection: "row", justifyContent: "center",alignItems: "center", padding: "5px"}}>
          <div className="track-card" style={{maxWidth: "75%", marginRight: "25px"}}>
            <div className="track-card-img" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <h2 style={{textAlign: "center"}}>{`${trackClone[0].name}`}</h2>
              <img
                style={{
                  maxHeight: "250px",
                  maxWidth: "250px",
                  borderRadius: "10px",
                  boxShadow: "10px 10px  10px rgba(155, 255, 200, 0.75)",
                }}
                src={`${trackImgUrl}`}
              />
            </div>
            <div className="track-card-details">
              <h2 id="track-card-location-price" style={{textAlign: "center"}}>
                {`${trackClone[0].city}, ${trackClone[0].state}`}
              </h2>
              <div id="track-card-location-price" style={{textAlign: "center", marginBottom: "25px"}}>
                {`Only $${trackClone[0].price}/day`}
              </div>


            </div>
          </div>
          <div className="track-detail-info" style={{justifyContent: "center", alignItems: "center"}}>
            <div style={{ maxHeight: "250px",
                  padding: "25px", margin: "50px",
                  backgroundColor: "rgba(155,255,200, .3)",
                  width: "250px",
                  borderRadius: "10px",
                  boxShadow: "10px 10px  10px rgba(155, 255, 200, 0.75)",}}>
                  <h2 style={{flexwrap: "none", textAlign: "center"}}>Track Details</h2>
                      here is some details about each track but its not part of crud so ill get to it later to be specific each track
                     <NavLink to="/tracks/new">Add Track</NavLink>
            </div>
          </div>
          <div className="track-review-container" style={{border: "3px solid purple"}}>
            <h1 style={{textAlign: "center"}}>Reviews</h1>
            <div className="oneTrack-review" style={{border: "2px solid blue"}}>
              this is where a random review will go eventually, i love filler
              data it's my favorite like aliens and butterflies. - My Daughter
            </div>
            <div className="track-review-buttons" style={{border: "1px solid yellow"}}>
                This div will show up info for adding a review no matter who you are. BUTTON
                <div className="track-review-buttons" style={{border: "1px solid green"}}>
                    These will be be buttons attached to review and only available to owner of review
                </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default OneTrack;
