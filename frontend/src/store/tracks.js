import {csrfFetch} from "./csrf"


//action types
const LOAD_TRACKS = "tracks/getTracks"
const LOAD_ONE_TRACK ="tracks/getOneTrack"

//action creators
const load = (list) => {
    return {
        type: LOAD_TRACKS,
        list,
    }
}
const getOne = (pl, id) => {
    return {
        type: LOAD_ONE_TRACK,
        pl,
        id,
    }
}

//thunkity thunk thunk
// get all tracks DONE
export const getTracks = () => async (dispatch) => {
    //send request from front end to backend
    const response = await csrfFetch('/api/tracks')
    const tracks = await response.json() //an array with objects of all the tracks

    dispatch(load(tracks))
}
//Get One Track
export const getOneTrack = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/tracks/${id}`);

    if (response.ok) {
      const track = await response.json();
      dispatch(getOne(track, id));
    }
  };

//initial state
const initialState = {

}

const sortList = (list) => {
    return list.sort((trackA, trackB) => {
        return trackA.name - trackB.name;
    }).map((track) => track.id)
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
                ...allTracks,
                ...state,

            }
        case LOAD_ONE_TRACK:
            const oneTrack = {}
           oneTrack[action.pl.id] = action.pl
           return {
               oneTrack,
               ...state,
           }
    default:
        return state;
    }
}

export default trackReducer;
