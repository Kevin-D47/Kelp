import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBusinessesThunk } from "../../store/businesses";
import { NavLink } from 'react-router-dom'
import './restaurants.css'


const GetAllBusinesses = () => {

    const allBusinesses = useSelector(state => state.businesses)
    const allBusinessesArr = Object.values(allBusinesses)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBusinessesThunk())
    }, [dispatch])

    if (!allBusinessesArr.length) {
        return null
    }

    return (
        <div>
            {allBusinessesArr.map((business) => {
                return (
                    <div key={business.id}>
                        {business.name}
                    </div>
                )
            })}
        </div>
    )
}

export default GetAllBusinesses
