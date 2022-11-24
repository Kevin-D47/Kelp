
// types
const GET_ALL_BUSINESSES = "/businesses/getAllBusinesses";
const GET_ONE_BUSINESS = "/businesses/getOneBusiness";
const NEW_BUSINESS = "/businesses/newBusiness";
const UPDATE_BUSINESS = "/businesses/updateBusiness";
const DELETE_BUSINESS = "/businesses/deleteBusiness";


// actions
const getAllBusinesses = (businesses) => ({
    type: GET_ALL_BUSINESSES,
    businesses
});

const getOneBusiness = (business) => ({
    type: GET_ONE_BUSINESS,
    business,
});

const newBusiness = (business) => ({
    type: NEW_BUSINESS,
    business,
});

const updateBusiness = (business) => ({
    type: UPDATE_BUSINESS,
    business,
});

const deleteBusiness = (businessId) => ({
    type: DELETE_BUSINESS,
    businessId,
});


// thunks
export const getAllBusinessesThunk = () => async (dispatch) => {
    const response = await fetch("/api/restaurants/all");

    if (response.ok) {
        const businesses = await response.json();
        dispatch(getAllBusinesses(businesses));
        return businesses;
    }
};

export const getOneBusinessThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`);

    if (response.ok) {
        const business = await response.json();
        dispatch(getOneBusiness(business));
        return business;
    }
};

export const createBusinessThunk = (userId, address, city, state, country, zip, name, description, phone, price, previewImageUrl) => async (dispatch) => {
    const response = await fetch("/api/businesses/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, address, city, state, country, zip, name, description, phone, price, previewImageUrl })
    });
    if (response.ok) {
        const createBusiness = await response.json();
        dispatch(newBusiness(createBusiness))
        return createBusiness;
    }
};

export const updateBusinessThunk = (businessId, userId, address, city, state, country, zip, name, description, phone, price, previewImageUrl) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, address, city, state, country, zip, name, description, phone, price, previewImageUrl }),
    });
    if (response.ok) {
        const updatedbusiness = await response.json();
        dispatch(updateBusiness(updatedbusiness));
    }
};

export const deleteBusinessThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/delete`, {
        method: "DELETE",
    });
    if (response.ok) {
        const deletedBusiness = await response.json();
        dispatch(deleteBusiness(deletedBusiness));
    }
};


//reducer
const initialState = {};

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BUSINESSES: {
            const newState = {}
            action.businesses.businesses.forEach((business) => {
                newState[business.id] = business
            })
            return newState;
        }
        case GET_ONE_BUSINESS: {
            const newState = { ...state }
            newState[action.business.id] = action.business
            return newState
        }
        case NEW_BUSINESS: {
            const newState = { ...state };
            newState[action.business.id] = action.business;
            return newState;
        }
        case UPDATE_BUSINESS: {
            const newState = { ...state };
            newState[action.business.id] = action.business
            return newState;
        }
        case DELETE_BUSINESS: {
            const newState = { ...state };
            delete newState[action.businessId]
            return newState;
        }
        default:
            return state;
    }
};

export default businessReducer;
