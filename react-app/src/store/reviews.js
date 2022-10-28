
// types
const GET_ALL_REVIEWS = '/reviews/getAllReviews'
const BUSINESS_REVIEWS = 'reviews/getBusinessReviews'
const NEW_REVIEW = '/reviews/newReview'
const UPDATE_REVIEW = "businesses/updateReview";
const DELETE_REVIEW = '/reviews/deleteReview'


// actions
const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})

const getBusinessReviews = (businessId) => ({
    type: BUSINESS_REVIEWS,
    businessId
})

const newReview = (review) => ({
    type: NEW_REVIEW,
    review
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review,
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})


// thunks
export const getAllReviewsThunk = () => async (dispatch) => {
    const response = await fetch("/api/reviews/all");

    if (response.ok) {
        const allReviews = await response.json();
        dispatch(getAllReviews(allReviews));
        return allReviews;
    }
};

export const getBusinessReviewsThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`);

    if (response.ok) {
        const businessReviews = await response.json();
        dispatch(getBusinessReviews(businessReviews));
        return businessReviews;
    }
};

export const createReviewThunk = (userId, businessId, review, stars) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, businessId, review, stars })
    });
    if (response.ok) {
        const createReview = await response.json();
        dispatch(newReview(createReview))
        return createReview;
    }
};

export const updateReviewThunk = (id, userId, businessId, review, stars) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userId, businessId, review, stars })
    })
    if (response.ok) {
        const editReview = await response.json()
        dispatch(updateReview(editReview))
    }
}

export const deleteReviewThunk = (businessId, id) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews/${id}/delete`, {
        method: "DELETE",
    })
    if (response.ok) {
        const reviewDelete = await response.json()
        dispatch(deleteReview(id))
        return reviewDelete
    }
}


// reducer
const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            const newState = { ...action.reviews }
            return newState
        }
        case BUSINESS_REVIEWS: {
            const newState = { ...action.businessId }
            return newState
        }
        case NEW_REVIEW: {
            const newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        }
        case UPDATE_REVIEW: {
            const newState = { ...state }
            newState[action.review.id] = action.review
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
};

export default reviewReducer
