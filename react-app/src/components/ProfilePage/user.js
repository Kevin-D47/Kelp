import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { getAllBusinessesThunk } from "../../store/businesses";
import { getAllReviewsThunk } from "../../store/reviews";

import businessIcon from '../../icons/business-icon.png'
import reviewsIcon from '../../icons/rating-checked.png'
import photosIcon from '../../icons/camera-icon-2.png'

import './user.css'

const User = () => {
    let createdAtDate;
    const [user, setUser] = useState({});
    const { userId } = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBusinessesThunk());
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllReviewsThunk());
    }, [dispatch])

    const allBusinesses = useSelector((state) => state.businesses);
    const allReviews = useSelector((state) => state.reviews);
    const allBusinessesArr = Object.values(allBusinesses);
    const allReviewsArr = Object.values(allReviews);

    const userBusinessesArr = allBusinessesArr.filter((business) => business.userId == userId);
    const userReviewsArr = allReviewsArr.filter((review) => review.userId == userId);

    // console.log('All User Buniesses------',userBusinessesArr )
    // console.log('All User Reviews------',userReviewsArr )

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (user.id == userId) {
        const createdAtObject = user.created_at;
        const createdAtString = JSON.stringify(createdAtObject);
        const date = createdAtString.slice(5, 8);
        const month = createdAtString.slice(9, 12);
        const year = createdAtString.slice(13, 17);
        createdAtDate = `${month} ${date}, ${year}`;
    }

    console.log('USER-----', user)

    if (!user) {
        return null;
    }

    return (
        <div className="profile-container">
            <div className="profile-banner-bg"></div>
            <div className="profile-header-container">
                <img className="user-profile-pic" src={user.profileImageUrl}></img>
                <div>
                    <div>{user.first_name} {user.last_name}</div>
                    <div className="user-profile-header-info">
                        <div className="profile-header-info">
                            <img className="business-icon" src={businessIcon}></img>
                            {userBusinessesArr.length} Businesses
                        </div>
                        <div className="profile-header-info">
                            <img className="review-icon" src={reviewsIcon}></img>
                            {userReviewsArr.length} Reviews
                        </div>
                        <div className="profile-header-info">
                            <img className="photo-icon" src={photosIcon}></img>
                            Photos Placeholder
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default User;
