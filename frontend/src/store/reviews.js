// import {LOAD_REVIEWS, DELETE_REVIEWS, POST_REVIEW} from "./reviews"
import { csrfFetch } from "./csrf"

export const LOAD_REVIEWS ="reviews/LOAD_COMMENTS"
export const UPDATE_REVIEW ="reviews/UPDATE_COMMENTS"
export const DELETE_REVIEW ="reviews/DELETE_REVIEW"
export const ADD_REVIEW ="reviews/ADD_REVIEW"

const load = (reviews, trackId) => ({
    type: LOAD_REVIEWS,
    reviews,
    trackId
})
const update = (review) => ({
    type: UPDATE_REVIEW,
    review
})
const add = (review) => ({
    type: ADD_REVIEW,
    review
})
const remove = (reviewId, trackId) => ({
    type: DELETE_REVIEW,
    reviewId,
    trackId
})

export const getComments = (trackId) => async(dispatch) => {
    const response = await fetch(`/api/tracks/${trackId}/reviews`);

    if (response.ok) {
      const reviews = await response.json();
      dispatch(load(reviews, trackId));
    }
}
export const createReview = (data) => async (dispatch) => {


    const response = await csrfFetch(`/api/tracks/${data.trackId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
      const newReview = await response.json()
      dispatch(add(newReview))
      return newReview
  }

  export const deleteReview = (reviewId, trackId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tracks/${trackId}/reviews/${reviewId}`, {
        method: 'delete',
      });

      if (response.ok) {
        const { id: deletedReviewId } = await response.json();
        console.log(deletedReviewId)
        dispatch(remove(deletedReviewId, trackId));

      }
  }

  const initialState = {};

  const reviewsReducer = (state = initialState, action) => {
      switch (action.type) {
          case LOAD_REVIEWS:
              const newReviews={};
              action.reviews.forEach(review => {
                  newReviews[review.id] = review;
              })
              return {
                  ...state,
                  ...newReviews
              }
            case ADD_REVIEW:
              return {
                ...state,
                [action.review.id]: action.review
              }
            case UPDATE_REVIEW:
              return {
                  ...state,
                  [action.review.id]: action.review
              }
            case DELETE_REVIEW:
                    const newState = {...state}
                    delete newState[action.reviewId]
                    return newState
            default:
                return state;
      }
  }

  export default reviewsReducer;
