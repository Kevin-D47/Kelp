const GET_ALL_IMAGES = 'images/getAllImages'
const GET_ONE_IMAGE = 'images/getOneImage'
const BUSINESS_IMAGES = 'images/getBusinessImages'
const NEW_IMAGE = 'images/newImage'
const DELETE_IMAGE = 'images/deleteImage'


// actions
const getAllImages = (images) => ({
    type: GET_ALL_IMAGES,
    images
})

const getBusinessImages = (businessId) => ({
    type: BUSINESS_IMAGES,
    businessId
})

const getOneImage = (image) => ({
    type: GET_ONE_IMAGE,
    image
})

const newImage = (image) => ({
    type: NEW_IMAGE,
    image
})

const deleteImage = (imageId) => ({
    type: DELETE_IMAGE,
    imageId
})


// thunks
export const getAllImagesThunk = () => async (dispatch) => {
    const response = await fetch("/api/images/all");

    if (response.ok) {
        const allImages = await response.json();
        dispatch(getAllImages(allImages));
        return allImages;
    }
};

export const getBusinessImagesThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images`);

    if (response.ok) {
        const businessImages = await response.json();
        dispatch(getBusinessImages(businessImages));
        return businessImages;
    }
};

export const getOneImageThunk = (businessId, imageId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images/${imageId}`);

    if (response.ok) {
        const image = await response.json();
        dispatch(getOneImage(image));
        return image;
    }
};

export const createImageThunk = (userId, businessId, imgUrl, description) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, businessId, imgUrl, description })
    });
    if (response.ok) {
        const createImage = await response.json();
        dispatch(newImage(createImage))
        return createImage;
    }
};

export const deleteImageThunk = (businessId, id) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images/${id}/delete`, {
        method: "DELETE",
    })
    if (response.ok) {
        const imageDelete = await response.json()
        dispatch(deleteImage(id))
        return imageDelete
    }
}


// reducer
const initialState = {}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_IMAGES: {
            const newState = { ...action.images }
            return newState
        }
        case BUSINESS_IMAGES: {
            const newState = { ...action.businessId }
            return newState
        }
        case GET_ONE_IMAGE: {
            const newState = { ...state }
            newState[action.image.id] = action.image
            return newState
        }
        case NEW_IMAGE: {
            const newState = { ...state }
            newState[action.image.id] = action.image
            return newState
        }
        case DELETE_IMAGE: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
};

export default imageReducer
