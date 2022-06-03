import {csrfFetch} from "./csrf"


//action types
const LOAD_TRACKS = "tracks/getTracks"
const LOAD_ONE_TRACK ="tracks/getOneTrack"
const CREATE_TRACK = "tracks/addTrack"
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


      const track = await response.json();
// console.log("TRACK", track, "ID:", id)
      dispatch(getOne(track));

  };
  //create track
  export const createTrack = (data) => async (dispatch) => {

    const { name, address, city, state, country, phone, web, price } = data
    const response = await csrfFetch("/api/tracks", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: 1, name, address, city, state, country, phone, web, price
      })
    });

    const track = await response.json();
    dispatch(addTrack(track));
    return track
  };

//initial state
const initialState = {

}

// const sortList = (list) => {
//     return list.sort((trackA, trackB) => {
//         return trackA.name - trackB.name;
//     }).map((track) => track.id)
// }

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


            }
        case LOAD_ONE_TRACK:
            const oneTrack = {}
           oneTrack[action.pl.id] = action.pl
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

    default:
        return state;
    }
}

export default trackReducer;
