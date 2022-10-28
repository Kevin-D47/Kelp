import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBusinessReviewsThunk, } from '../../store/reviews'
import { getOneBusinessThunk } from '../../store/businesses'
import { getAllUsersThunk } from '../../store/users'

import './businessReviews.css'

const BusinessReviews = ({ businessId }) => {
    const dispatch = useDispatch();


    const sessionUser = useSelector(state => state.session.user)

    const allReviews = useSelector(state => state.reviews)
    const getAllReviewArr = Object.values(allReviews)

    const allUsers = useSelector(state => state.users)
    const allUsersArr = Object.values(allUsers)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [dispatch])

    useEffect(() => {
        dispatch(getBusinessReviewsThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])

    if (!getAllReviewArr.length) {
        return null
    }

    return (
        isLoaded && (
            <div>
                <ul>
                    {getAllReviewArr.map(review => {
                        return (
                            <div key={review.id}>
                                <div className='user-container' style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    <div className='box'>
                                        <div className='user-name'>
                                            {allUsersArr && allUsersArr.map(user => {
                                                return (
                                                    <> {review.userId === user.id ? (
                                                        <div key={review.userId === user.id ? user.id : ''}>
                                                            <img className='reviewUserPic' src={review.userId === user.id ? user.profileImageUrl : ''}></img>
                                                            {review.userId === user.id ? user.first_name : ''}
                                                            {review.userId === user.id ? user.last_name : ''}
                                                        </div>) : ''}
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='stars'>
                                    RATING: {review.stars} star
                                </div>
                                <div className='review'>
                                    COMMENT: {review.review}
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    )

}

export default BusinessReviews
