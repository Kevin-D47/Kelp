import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";

import { getAllBusinessesThunk } from '../../store/businesses';
import { getAllUsersThunk } from '../../store/users';

import './businessDetails.css'


const BusinessDetails = () => {
    return (
        <h2>Business Details Page</h2>
    )
}

export default BusinessDetails
