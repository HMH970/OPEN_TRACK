export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
export const ADD_REVIEW = "reviews/ADD_REVIEW";

const load = (reviews, trackId) => ({
  type: LOAD_REVIEWS,
  reviews,
  trackId
});

const update = (review) => ({
  type: UPDATE_REVIEW,
  review
});

const add = (review) => ({
  type: ADD_REVIEW,
  review
});

const remove = (reviewId, trackId) => ({
  type: REMOVE_REVIEW,
  reviewId,
  trackId
});

//!!START SILENT
export const getItems = (trackId) => async (dispatch) => {
  const response = await fetch(`/api/tracks/${trackId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(load(reviews, trackId));
  }
};

export const updateReview = data => async dispatch => {
  const response = await fetch(`/api/reviews/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(update(review));
    return review;
  }
};

export const deleteReview = (reviewId, trackId) => async dispatch => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'delete',
  });

  if (response.ok) {
    const { id: deletedReviewId } = await response.json();
    dispatch(remove(deletedReviewId, trackId));
    return deletedReviewId;
  }
};

export const createReview = (data, trackId) => async dispatch => {
  const response = await fetch(`/api/tracks/${trackId}/reviews`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(add(review));
    return review;
  }
};

//!!END
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const newReviews = {};
      action.reviews.forEach(review => {
        newReviews[review.id] = review;
      })
      return {
        ...state,
        ...newReviews
      }
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    case ADD_REVIEW:
    case UPDATE_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review
      };
    default:
      return state;
  }
};

export default reviewsReducer;
