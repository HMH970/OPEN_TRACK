import  ValidationError  from "../utils/validationError"
import {csrfFetch, restoreCSRF} from "./csrf"
// import {ValidationError} from "../utils/validationError"

import {LOAD_REVIEWS, DELETE_REVIEW, ADD_REVIEW, UPDATE_REVIEW} from "./reviews"



//action types
const LOAD_TRACKS = "tracks/getTracks"
const LOAD_ONE_TRACK ="tracks/getOneTrack"
const CREATE_TRACK = "tracks/addTrack"
const DELETE_TRACK = "tracks/deleteTrack"
const UPDATE_TRACK = "tracks/updateTrack"
//action creators
const load = (list) => {
    return {
        type: LOAD_TRACKS,
        list,
    }
}
const getOne = (pl) => {
    return {
        type: LOAD_ONE_TRACK,
        pl,

    }
}
const addTrack = (pl) => {
    return {

        type: CREATE_TRACK,
        pl,
    }
}

// const updateTrack = (track) => {
//     type: UPDATE_TRACK,
//     track
// }

const deleteTrack = (trackId) => ({
    type: DELETE_TRACK,
    trackId
})

//thunkity thunk thunk
// get all tracks DONE
export const getTracks = () => async (dispatch) => {
    //send request from front end to backend
    const response = await csrfFetch('/api/tracks')
    if(response.ok){
        const tracks = await response.json() //an array with objects of all the tracks
        dispatch(load(tracks))
    }
}
//Get One Track
export const getOneTrack = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/tracks/${id}`);

    if(response.ok){
        const track = await response.json();
        dispatch(getOne(track));
    }
  };
  //create track
  export const createTrack = (data) => async (dispatch) => {
 try {
    const { name, address, city, state, country, phone, web, price } = data
    const response = await csrfFetch("/api/tracks", {
      method: "POST",
      body: JSON.stringify(data)
    });
    if(!response.ok) {
        let error;
        if (response.status === 422) {
            throw new ValidationError(error.errors, response.statusText)
        } else {
            let jsonError;
            error = await response.text();
            try {
             jsonError = JSON.parse(error);
         } catch {
             throw new Error(error);
         }
            throw new Error(`${jsonError.title}: ${jsonError.message}`);
        }
    }
    const newTrack = await response.json();
    dispatch(addTrack(newTrack));
    return newTrack
  } catch (error) {
      throw error;
  }
}

export const updateTrack = (data) => async(dispatch) => {
    const response = await csrfFetch(`api/tracks/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    if (response.ok) {
        const updatedTrack = await response.json();
        dispatch(addTrack(updatedTrack))
        return updatedTrack
    }
}
export const delete_Track = (trackId) => async (dispatch) => {
    const response = await csrfFetch(`api/tracks/${trackId}`, {
        method: 'DELETE',
    })
    if(response.ok) {
        const track = await response.json();
        dispatch(deleteTrack(track));
        return trackId
    }
}

export const getComments = (trackId) => async(dispatch) => {
    const response = await fetch(`/api/tracks/${trackId}/reviews`);


  if (response.ok) {

    const list = await response.json();
    // Data from backend, into regular action
    dispatch(load(list));
  }
}



//initial state
const initialState = {

}

//reducer
const trackReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_TRACKS:
            const allTracks = {}
            action.list.forEach((track) => {
                allTracks[track.id] = track;
            })
            return {
                ...state,
                ...allTracks,

            }
        case LOAD_ONE_TRACK:
            const oneTrack = {}
           oneTrack[action.pl.id] = action.pl
        //    console.log(oneTrack, "157")
           return {
               ...state,
               [action.pl.id]: action.pl,
                oneTrack
           }
        case CREATE_TRACK:
            if(!state[action.track.id]) {
                const newState = {
                    ...state,
                    [action.track.id]: action.track,
                }
                const trackList = newState.list.map((id) => newState[id]);
                trackList.push(action.track);
                newState.list = trackList;
                return newState;
              }
              return {
                ...state,
                [action.track.id]: {
                  ...state[action.track.id],
                  ...action.track,
                },
              };
              case UPDATE_TRACK:
                  return {
                      ...state,
                      [action.track.id]: action.track
                  }
              case DELETE_TRACK:
                const newState = { ...state };
                delete newState[action.trackId]
                return newState;
              case LOAD_REVIEWS:
                  return {
                      ...state,
                      [action.trackId]: {
                          ...state[action.trackId],
                          reviews: action.reviews.map((review) => review.id)
                      }
                  }
               case DELETE_REVIEW:
                  return {
                      ...state,
                      [action.trackId]: {
                          ...state[action.trackId],
                          reviews: state[action.trackId].comments.filter(reviewId => reviewId !== action.reviewId)
                      }
                  }
                case ADD_REVIEW:
                 return {
                      ...state,
                      [action.review.trackId]: {
                          ...state[action.review.trackId],
                          reviews: [...state[action.review.trackId], action.review.id]
                      }
                  }
                  case UPDATE_REVIEW:
                 return {
                      ...state,
                      [action.review.trackId]: {
                          ...state[action.review.trackId],
                          reviews: [...state[action.review.trackId], action.review.id]
                      }
                  }

    default:
        return state;
    }
}

export default trackReducer;
