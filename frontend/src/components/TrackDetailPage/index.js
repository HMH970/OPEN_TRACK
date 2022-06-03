import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import * as trackActions from "../../store/tracks";
import * as sessionActions from "../../store/session";

function OneTrack(pl, id) {
  const { trackId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const trackOne = useSelector((state) => state.track);
  const sessionUser = useSelector((state) => state.session.user);
  const trackClone = Object.values(trackOne).slice(0, 1);
  const [editUrl, setEditUrl] = useState("")
  let Images;
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
  }, [dispatch]);


  return (
    <div >
      {trackClone.length > 0 ? (
        <div className="track-detail-page" style={{backgroundColor: "lightgray", height: "90%", display: "flex", flexDirection: "row", justifyContent: "center",alignItems: "center", padding: "5px"}}>
          <div className="track-card" style={{maxWidth: "75%", marginRight: "25px"}}>
            <div className="track-card-img">
              <h2>{`${trackClone[0].name}`}</h2>
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
              <h2 id="track-card-location-price">
                {`${trackClone[0].city}, ${trackClone[0].state}`}
              </h2>
              <div id="track-card-location-price">
                {`Only $${trackClone[0].price}/day`}
              </div>
               

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
        "track not found"
      )}
    </div>
  );
}
export default OneTrack;
