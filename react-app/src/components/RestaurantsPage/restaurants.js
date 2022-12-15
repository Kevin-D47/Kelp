import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBusinessesThunk } from "../../store/businesses";
import { NavLink, useHistory } from 'react-router-dom'

import imgNotFound from '../../icons/image-not-found.png'
import starChecked from '../../icons/rating-checked.png'
import starUnchecked from '../../icons/rating-unchecked.png'

import githubIcon from '../../icons/github-icon.png'
import linkedinIcon from '../../icons/linkedin-icon.png'
import kelpLogo from '../../icons/Kelp-logo.png'
import kelpTitleLogo from '../../icons/kelp-logo-title.png'

import './restaurants.css'


const GetAllBusinesses = () => {

    const dispatch = useDispatch();
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    const [isLoaded, setIsLoaded] = useState(false);
    let [ratingSum, setRatingSum] = useState(0);
    const [filterPrice, setFilterPrice] = useState('allResultsPrice')
    const [filterType, setFilterType] = useState('allResultsType')

    const allBusinesses = useSelector(state => state.businesses)
    const allBusinessesArr = Object.values(allBusinesses)

    // let arrResults;

    let typeBusinessesArr;

    let priceBusinessesArr;

    if (filterType !== 'allResultsType') {
        typeBusinessesArr = allBusinessesArr.filter((business) => business.type == filterType)
    } else {
        typeBusinessesArr = allBusinessesArr
    }

    if (filterPrice !== 'allResultsPrice') {
        priceBusinessesArr = typeBusinessesArr?.filter((business) => business.price == filterPrice);
    } else {
        priceBusinessesArr = typeBusinessesArr
    }



    const allReviews = useSelector(state => state.reviews)
    const getAllReviewsArr = Object.values(allReviews)

    useEffect(() => {
        dispatch(getAllBusinessesThunk()).then(() => setIsLoaded(true))
    }, [dispatch])


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

    return (
        isLoaded && (
            <div className="restraunts-container">
                <div className="restraunts-wrapper">
                    <div className="filter-container">
                        <div className={filterPrice === 'allResultsPrice' ? "clear-filter-buttons-inactive" : "clear-filter-buttons-active"} onClick={() => setFilterPrice('allResultsPrice')}>clear price filter</div>
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Price:</div>
                        <div className="price-filter-container">
                            <div className="price-filter-options">
                                <div className={filterPrice === '$' ? "filter-price-buttons-first price-active-filter-bg-first" : "filter-price-buttons-first"} onClick={() => setFilterPrice('$')}>$</div>
                                <div className={filterPrice === '$$' ? "filter-price-buttons-mid price-active-filter-b-mid" : "filter-price-buttons-mid"} onClick={() => setFilterPrice('$$')}>$$</div>
                                <div className={filterPrice === '$$$' ? "filter-price-buttons-mid price-active-filter-bg-mid" : "filter-price-buttons-mid"} onClick={() => setFilterPrice('$$$')}>$$$</div>
                                <div className={filterPrice === '$$$$' ? "filter-price-buttons-last price-active-filter-bg-last" : "filter-price-buttons-last"} onClick={() => setFilterPrice('$$$$')}>$$$$</div>
                            </div>
                        </div>
                        <div className={filterType === 'allResultsType' ? "clear-filter-buttons-inactive" : "clear-filter-buttons-active"} onClick={() => setFilterType('allResultsType')}>clear type filter</div>
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Type:</div>
                        <div className="type-filter-container">
                            <div className="type-filter-option-container">
                                <button className={filterType === 'all' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('All')}>&nbsp;</button>
                                <div>All</div>
                            </div>
                            <div className="type-filter-option-container">
                                <button className={filterType === 'fish' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Fish')}>&nbsp;</button>
                                <div>Fish</div>
                            </div>
                            <div className="type-filter-option-container">
                                <button className={filterType === 'crustaceans' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Crabs, Lobsters, and Shrimp')}>&nbsp;</button>
                                <div>Crabs, Lobsters, and Shrimp</div>
                            </div>
                            <div className="type-filter-option-container">
                                <button className={filterType === 'mollusks' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Clams, Oysters, and Scallops')}>&nbsp;</button>
                                <div>Clams, Oysters, and Scallops</div>
                            </div>
                            <div className="type-filter-option-container">
                                <button className={filterType === 'cephalopods' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Squid, Octopus, and Cuttlefish')}>&nbsp;</button>
                                <div>Squid, Octopus, and Cuttlefish</div>
                            </div>
                            <div className="type-filter-option-container">
                                <button className={filterType === 'other' ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"} onClick={() => setFilterType('Other')}>&nbsp;</button>
                                <div>Other</div>
                            </div>
                        </div>
                    </div>
                    <div className="restraunt-results-conatiner">
                        <div className="result-header-container">
                            <h2>The Best Seafood Restaurants to visit</h2>
                        </div>
                        {priceBusinessesArr.length === 0 ? <div>No results</div> : priceBusinessesArr.map((business) => {
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
                                            <div className="restraunt-type-container">Type of Seafood: <div className="restraunt-type">{business.type}</div></div>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="hompage-footer-container">
                    <div className='hompage-footer-wrapper'>
                        <div className="about-footer-container">
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>About</div>
                            <a className="footer-link" href="https://github.com/Kevin-D47/Kelp" target="_blank">
                                <img className='footer-icon' src={githubIcon}></img>
                                <div className="kelp-github-repo">Kelp Github Repository</div>
                            </a>
                        </div>
                        <div className="developer-footer-container">
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Developer</div>
                            <div style={{ fontWeight: '500' }}>Kevin Duong</div>
                            <div className='kevin-links'>
                                <a className="footer-link" href="https://www.linkedin.com/in/kevin-duong-513341216/" target="_blank">
                                    <img className='footer-icon' src={linkedinIcon}></img>
                                    <div className="kelp-github-repo">LinkedIn</div>
                                </a>
                                <a className="footer-link" href="https://github.com/Kevin-D47" target="_blank">
                                    <img className='footer-icon' src={githubIcon}></img>
                                    <div className="kelp-github-repo">Github</div>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className='copyright-container'>
                        <div>Copyright © 2022 Kelp Inc. Kelp,</div> &nbsp;
                        <img className='coyright-icon' src={kelpTitleLogo}></img>
                        <div>,</div> &nbsp;
                        <img className='coyright-icon-2' src={kelpLogo}></img> &nbsp;
                        <div>and related marks are registered trademarks of Kelp.</div>
                    </div>

                </div>
            </div>
        )
    )
}

export default GetAllBusinesses
