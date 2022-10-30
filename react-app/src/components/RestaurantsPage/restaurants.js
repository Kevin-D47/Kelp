import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBusinessesThunk, getOneBusinessThunk } from "../../store/businesses";
import { getBusinessReviewsThunk } from "../../store/reviews";
import { NavLink } from 'react-router-dom'

import imgNotFound from '../../icons/image-not-found.png'

import './restaurants.css'


const GetAllBusinesses = ({ businessId }) => {

    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false)
    let [ratingSum, setRatingSum] = useState(0);

    const allBusinesses = useSelector(state => state.businesses)
    const allBusinessesArr = Object.values(allBusinesses)

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewsArr = Object.values(allReviews)

    useEffect(() => {
        dispatch(getAllBusinessesThunk())
    }, [dispatch])

    useEffect(() => {
        dispatch(getBusinessReviewsThunk(businessId))
        dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])


    if (!allBusinessesArr.length) {
        return null
    }


    return (
        isLoaded && (
            <div className="restraunts-container">
                <div className="restraunts-wrapper">
                    <h2>The Best Seafood Restaurants to visit</h2>
                    <h3>Results</h3>
                    {allBusinessesArr.map((business) => {
                        return (
                            <div className="all-restraunts-container" key={business.id}>
                                <NavLink className="single-rest-container" to={`/businesses/${business.id}`}>
                                    <div className="single-rest-container-left">
                                        <img className="restraunt-img" src={business.previewImageUrl}></img>
                                        {/* handles broken image urls but not working */}
                                        {/* <img
                                        className="restraunt-img"
                                        src={business.previewImageUrl}
                                        alt={imgNotFound}
                                        onError={e => { e.currentTarget.src={imgNotFound}; }}
                                    /> */}
                                    </div>
                                    <div className="single-rest-container-right">
                                        <div className="restraunt-name">{business.name}</div>
                                        <div className="restraunt-info-container">
                                            {/* placeholder for ratings and #reviews */}
                                            {business.reviews.map((review) => {
                                                { ratingSum += review.stars }
                                            })}
                                            <div className="avgReviews-placeholder">{Number(ratingSum / business.reviews.length).toFixed(1)} kelp</div>
                                            <div>{business.reviews.length} Reviews</div>
                                            <div>{business.price}</div>
                                        </div><div className="ratingSum-hide">{ratingSum = 0}</div>
                                        <div className="restraunt-location">
                                            {business.city}, {business.state}
                                        </div>
                                        <div className="restraunt-description">{business.description}</div>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        )

    )
}

export default GetAllBusinesses
