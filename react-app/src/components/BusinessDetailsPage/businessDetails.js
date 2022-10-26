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


    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId))
    }, [dispatch, businessId])

    return (
        <div >
            <h2> Business Details Page</h2 >
            <h2>{currBusiness.name}</h2>
        </div>
    )


}

export default BusinessDetails
