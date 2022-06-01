import {csrfFetch} from "./csrf"


//action types
const LOAD_TRACKS = "tracks/getTracks"


//action creators
const load = (list) => {
    return {
        type: LOAD_TRACKS,
        list,
    }
}

//thunkity thunk thunk
export const getTracks = async (dispatch) => {
    //send request from front end to backend
    const response = await csrfFetch('/api/tracks')
    const tracks = await response.json() //an array with objects of all the tracks

    dispatch(load(tracks))
}

//initial state
const initialState = {
    list: [],
    types: []
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
                list: sortList(action.list)
            }
    default:
        return state;
    }
}

export default trackReducer;
