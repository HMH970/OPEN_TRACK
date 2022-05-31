import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneTrack } from '../../store/tracks';
// import PokemonItems from './PokemonItems';
// import EditPokemonForm from './EditPokemonForm';
// import ItemForm from './ItemForm';

const TrackDetail = () => {
  const { trackId } = useParams();
  const track = useSelector(state => state.track[trackId]);
  //!!START SILENT
  const dispatch = useDispatch();
  //!!END
  const [showEditTrackForm, setShowEditTrackForm] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  //!!START SILENT
  const [showAddForm, setShowAddForm] = useState(false);
  //!!END

  useEffect(() => {
    //!!START SILENT
    dispatch(getOneTrack(trackId));
    //!!END
    setShowEditTrackForm(false);
    setEditTrackId(null);
  //!!START SILENT
  }, [dispatch, trackId]);
  //!!END
  //!!ADD
  // }, [trackId]);
  //!!END_ADD

  if (!track) {
    return null;
  }

  let content = null;

  //!!START SILENT
  if (showAddForm) {
    content = (
      <ReviewForm
        trackId={track.id}
        reviewId={-1}
        hideForm={() => setShowAddForm(false)}
      />
    );
  } else if (editReviewId) {

    content = (
      <ReviewForm
        reviewId={editReviewId}
        hideForm={() => setEditReviewId(null)}
      />
    );
  } else if (showEditTrackForm) {
    content = (
      <EditTrackForm
        track={track}
        hideForm={() => setShowEditTrackForm(false)}
      />
    );
  } else {
    content = (
      <div className="track-detail-lists">
        <div>
          <h2>Track Name</h2>
          <ul>
            <li>
              <b>Address</b> {track.address}
            </li>
            <li>
              <b>City</b> {track.city}
            </li>
            <li>
              <b>State</b> {track.state}
            </li>
            <li>
              <b>Country</b> {track.country}
            </li>
            <li>
              <b>Price</b> {track.price}
            </li>
            <li>
              <b>Phone</b> {track.phone}
            </li>
            <li>
              <b>Website</b> {track.web}
            </li>

          </ul>
        </div>
        <div>


        </div>
      </div>
    );
  }

  return (
    <div className="track-detail">
      <div className={`track-detail-image-background`}>
        {/* <div
          className="track-detail-image"
          style={{ backgroundImage: `url('${track.imageUrl}')` }}
        ></div> */}
        <div>
          <h1 className="h1">{track.name}</h1>
          {(!showEditTrackForm) && (
            <button onClick={() => setShowEditTrackForm(true)}>Edit</button>
          )}
        </div>

      </div>
      {content}
    </div>
  );
};

export default TrackDetail;
