import { LOAD_REVIEWS, REMOVE_REVIEW, ADD_REVIEW } from "./reviews";
import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf"

const LOAD = "tracks/LOAD"; //  get all
// const REMOVE_REVIEWS = "reviews/REMOVE"
const ADD_ONE = "tracks/ADD_ONE";


const load = (list) => ({
  type: LOAD,
  list,
});



const addOneTrack = (track) => {
  console.log('IN ADD_ONE_track ACTION - TRACK -> ', track)
  return {
    type: ADD_ONE,
    track: track,
  };
};

export const getTracks = () => async (dispatch) => {
  const response = await csrfFetch(`/api/tracks`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getTrackReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/${id}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(load(reviews));
  }
};

export const getOneTrack = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/tracks/${id}`);

  if (response.ok) {
    const track = await response.json();
    dispatch(addOneTrack(track));
  }
};

export const createTrack = (data) => async (dispatch) => {
  console.log("TOP OF THUNK IN STORE - data -> ", data);
  try {
    const response = await csrfFetch(`/api/tracks`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("AFTER RESPONSE IN THUNK - RESPONSE -> ", response);

    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      } else {
        let errorJSON;
        error = await response.text();
        try {
          // Check if the error is JSON, i.e., from the Pokemon server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        } catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const track = await response.json();

    console.log(
      "AFTER TRACK = RESPONSE.JSON() IN THUNK - TRACKS -> ",
      track
    );

    dispatch(addOneTrack(track));
    return track;
  } catch (error) {
    throw error;
  }
};

export const updateTrack = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/tracks/${data.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const track = await response.json();
    dispatch(addOneTrack(track));
    return track;
  }
};

const initialState = {
  list: [],
  types: [],
};

const sortList = (list) => {
  return list
    .sort((trackA, trackB) => {
      return trackA.name - trackB.name;
    })
    .map((track) => track.id);
};

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allTracks = {};
      action.list.forEach((track) => {
        allTracks[track.id] = track;
      });
      return {
        ...allTracks,
        ...state,
        list: sortList(action.list),
      };
    case ADD_ONE:
      console.log('IN REDUCER ADD ONE CASE - ACTION -> ', action);
      if (!state[action.track.id]) {
        const newState = {
          ...state,
          [action.track.id]: action.track,
        };
        const trackList = newState.list.map((id) => newState[id]);
        trackList.push(action.track);
        newState.list = sortList(trackList);
        return newState;
      }
      return {
        ...state,
        [action.track.id]: {
          ...state[action.track.id],
          ...action.track,
        },
      };
    case LOAD_REVIEWS:
      return {
        ...state,
        [action.trackId]: {
          ...state[action.trackId],
          reviews: action.reviews.map((review) => review.id),
        },
      };
    case REMOVE_REVIEW:
      return {
        ...state,
        [action.trackId]: {
          ...state[action.trackId],
          reviews: state[action.trackId].reviews.filter(
            (reviewId) => reviewId !== action.reviewId
          ),
        },
      };
    case ADD_REVIEW:
      console.log(action.review);
      return {
        ...state,
        [action.review.trackId]: {
          ...state[action.review.trackId],
          reviews: [...state[action.review.trackId].reviews, action.review.id],
        },
      };
    default:
      return state;
  }
};

export default trackReducer;
