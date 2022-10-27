import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";

import { getAllBusinessesThunk } from '../../store/businesses';
import { getOneBusinessThunk } from '../../store/businesses';
import { getAllUsersThunk } from '../../store/users';

import './businessDetails.css'


const BusinessDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const { businessId } = useParams()


    const sessionUser = useSelector(state => state.session.user)
    const currBusiness = useSelector(state => state.businesses[businessId])

    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true))
    }, [dispatch, businessId])

    return (
        isLoaded && (
            <div className='business-details-container'>
                <div className='business-photos-container'>
                    <img className='business-image' src={currBusiness.previewImageUrl}></img>
                </div>
                <div className='business-details-header-container'>
                    <div className='profile-pic-name'>
                        <div style={{ fontSize: '36px', color: 'red', fontWeight: 'bold' }}>{currBusiness.name}</div>
                    </div>
                </div>
            </div>
        )
    )


}

export default BusinessDetails
