import React from "react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";

import { updateBusinessThunk } from '../../store/businesses'

import './editBusinessForm.css'

const PRICES = [
    "$",
    "$$",
    "$$$",
    "$$$$"
];

const EditBusinessForm = ({ setShowUpdateBusiness }) => {
    const dispatch = useDispatch()

    const { businessId } = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const formInfo = useSelector(state => state.businesses[businessId])

    const [address, setAddress] = useState(formInfo.address);
    const [city, setCity] = useState(formInfo.city);
    const [state, setState] = useState(formInfo.state);
    const [country, setCountry] = useState(formInfo.country);
    const [zip, setZip] = useState(formInfo.zip);
    const [name, setName] = useState(formInfo.name);
    const [phone, setPhone] = useState(formInfo.phone);
    const [description, setDescription] = useState(formInfo.description);
    const [price, setPrice] = useState(formInfo.price);
    const [previewImageUrl, setPreviewImageUrl] = useState(formInfo.previewImageUrl);

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];

        if (!name) errors.push("Please provide a business name");
        if (!address) errors.push("Please provide an address");
        if (!city) errors.push("Please provide a city");
        if (!state) errors.push("Please provide a state");
        if (!country) errors.push("Please provide a country");
        if (!zip || zip.length > 5 || zip.length < 5) errors.push("Please provide a valid 5-digit zip code")
        if (!phone || phone.length > 10 || phone.length < 10) errors.push("Please provide a valid 10-digit phone number");
        if (!description) errors.push("Please provide a description");
        if (!price) errors.push("Please provide a price range");
        if (!previewImageUrl) errors.push("Please provide a image");


        return setErrors(errors);
    }, [address, city, state, country, zip, name, description, phone, price, previewImageUrl]);


    if (sessionUser === null) {
        alert("You must be logged in to edit a business");
        return <Redirect to="/" />;
    }

    async function onSubmit(e) {
        e.preventDefault()

        setHasSubmitted(true)

        if (errors.length > 0) return alert('invalid submission')

        dispatch(updateBusinessThunk(businessId, userId, address, city, state, country, zip, name, description, phone, price, previewImageUrl))
        setShowUpdateBusiness(false)
    }


    return (
        <div className='edit-business-container'>
            <div className="edit-business-wrapper">
                <div className="edit-bus-form-container">
                    <h2 className="create-bus-title" >Edit Your Business</h2>
                    <div className="create-bus-message">Update your informations about your business below.</div>
                    <form
                        onSubmit={onSubmit}
                        autoComplete="off"
                    >
                        <div className="edit-bus-form-wrapper" >
                            <div className="create-bus-errors">
                                {errors.length > 0 && (
                                    <ul>
                                        {errors.map((error) => (
                                            <li key={error}>{error}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="create-bus-input-field">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                // required
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                // required
                                />
                            </div>
                            <div className="city-state-zip">
                                <input
                                    className="city-input-field"
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                // required
                                />
                                <input
                                    className="state-input-field"
                                    type="text"
                                    placeholder="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                // required
                                />
                                <input
                                    className="zip-input-field"
                                    type="number"
                                    placeholder="Zip Code"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                // required
                                />
                            </div>

                            <div className="create-bus-input-field">
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                // required
                                />

                                <input
                                    type="number"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                // required
                                />
                            </div>

                            <textarea
                                className="description-input-field"
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            // required
                            />
                            <select
                                className="price-input-field"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                                <option selected disabled value="">
                                    Select a Price Range
                                </option>
                                {PRICES.map(price => (
                                    <option
                                        key={price}
                                        value={price}
                                    >
                                        {price}
                                    </option>
                                ))}
                            </select>
                            <div className="create-bus-input-field">
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    value={previewImageUrl}
                                    onChange={(e) => setPreviewImageUrl(e.target.value)}
                                // required
                                />
                            </div>
                            <div>
                                <button
                                    className="create-bus-form-bttn"
                                    type="submit"
                                    // onClick={handleSubmit}
                                    disabled={hasSubmitted && errors.length > 0}
                                >Submit Business
                                </button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )

}

export default EditBusinessForm
