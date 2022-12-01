import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";

import { getAllBusinessesThunk } from "../../store/businesses";

import imgNotFound from '../../icons/image-not-found.png'
import starChecked from '../../icons/rating-checked.png'
import starUnchecked from '../../icons/rating-unchecked.png'

import kelpLogo from '../../icons/Kelp-logo.png'

import './searchPage.css'


const SearchPage = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const { searchTerm } = useParams();

    let [ratingSum, setRatingSum] = useState(0);

    const sessionUser = useSelector(state => state.session.user)

    const allBusinesses = useSelector(state => state.businesses)
    const allBusinessesArr = Object.values(allBusinesses)

    let filteredBusinesses;

    if (allBusinessesArr != null) {
        filteredBusinesses = allBusinessesArr.filter((business) =>
            business.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    const ratingCount = (int) => {
        let ratings = []
        for (let num = 1; num <= 5; num++) {
            if (num <= int) {
                ratings.push(
                    <div>
                        <img className='rating-restraunts-showcase' src={starChecked}></img>
                    </div>
                )
            } else {
                ratings.push(
                    <div>
                        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
                    </div>
                )
            }
        }
        return ratings.map(rating => {
            return rating
        })
    }

    const emptyRating = <div className='single-rest-avgRating-containter'>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
        <img className='rating-restraunts-showcase' src={starUnchecked}></img>
    </div>

    if (!sessionUser) {
        history.push('/404')
    }


    if (!filteredBusinesses.length) {
        return (
            <div className="restraunts-container">
                <div className="restraunts-wrapper">
                    <div className="search-result-header-container">
                        <h2 className="search-header">
                            Search results for
                            <div style={{ color: '#7eb312' }}>{searchTerm}</div>
                        </h2>
                    </div>
                    <div className="login-container-PNF">
                        <div className="inner-login-PNF">
                            <img className="logo-PNF" src={kelpLogo}></img>
                            <div className="title-PNF">No Results Found</div>
                            <div className="link-error">
                                <NavLink to="/restaurants" className='link-error-text'>Click here to go back to all businesses page</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="restraunts-container">
                <div className="restraunts-wrapper">
                    <div className="search-result-header-container">
                        <h2 className="search-header">
                            Search results for
                            <div style={{ color: '#7eb312' }}>{searchTerm}</div>
                        </h2>
                    </div>
                    {filteredBusinesses &&
                        filteredBusinesses.map((business) => {
                            return (
                                <div className="all-restraunts-container" key={business.id}>
                                    <NavLink className="single-rest-container" to={`/businesses/${business.id}`}>
                                        <div className="single-rest-container-left">
                                            <img
                                                className="restraunt-img"
                                                src={business.previewImageUrl}
                                                alt={imgNotFound}
                                                onError={e => { e.currentTarget.src = imgNotFound }}
                                            />
                                        </div>
                                        <div className="single-rest-container-right">
                                            <div className="restraunt-name">{business.name}</div>
                                            <div className="restraunt-info-container">
                                                {business.reviews.map((review) => {
                                                    { ratingSum += review.stars }
                                                })}
                                                {!(ratingSum / business.reviews.length) ? <div>{emptyRating}</div> : <div className="single-rest-avgRating-containter"> {ratingCount(Math.round(ratingSum / business.reviews.length))}</div>}
                                                <div>{business.reviews.length} Reviews</div>
                                                <div>{business.price}</div>
                                            </div>
                                            <div className="ratingSum-hide">{ratingSum = 0}</div>
                                            <div className="restraunt-location">
                                                {business.city}, {business.state}
                                            </div>
                                            <div className="restraunt-description">{business.description}</div>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}

export default SearchPage
