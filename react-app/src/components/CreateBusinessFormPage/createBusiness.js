import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import { createBusinessThunk, getAllBusinessesThunk } from '../../store/businesses'

import './createBusiness.css'

const PRICES = [
    "$",
    "$$",
    "$$$",
    "$$$$"
];

const CreateBusinessForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(PRICES[0]);
    const [previewImageUrl, setPreviewImageUrl] = useState("");

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const errors = [];

        if (!address) errors.push("Please provide an address");
        if (!city) errors.push("Please provide a city");
        if (!state) errors.push("Please provide a state");
        if (!country) errors.push("Please provide a country");
        if (!zip || zip.length > 5 || zip.length < 5) errors.push("Please provide a valid 5-digit zip code")
        if (!name) errors.push("Please provide a business name");
        if (!phone || phone.length > 10 || phone.length < 10) errors.push("Please provide a valid 10-digit phone number");
        if (!description) errors.push("Please provide a description");
        if (!price) errors.push("Please provide a price range");
        if (!previewImageUrl) errors.push("Please provide a image");


        return setErrors(errors);
    }, [address, city, state, country, zip, name, description, phone, price, previewImageUrl]);


    if (sessionUser === null) {
        alert("You must be logged in to make a business");
        return <Redirect to="/" />;
    }

    async function onSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true);
        if (errors.length > 0) {
            return alert(
                "There was an error with your submission, Please recheck your inputs"
            );
        }

        function loadImage(previewImageUrl) {
            return previewImageUrl;
        }

        if (loadImage(previewImageUrl)) {
            dispatch(createBusinessThunk(userId, address, city, state, country, zip, name, description, phone, price, previewImageUrl))
                .then(() => dispatch(getAllBusinessesThunk()));
            history.push("/restaurants");
        }
    }

    // TEST FOR HEROKU

    return (
        <div className='create-business-container'>
            <div className="Image-Container">
                <h2>Add Your Business</h2>
                <div className="create-bus-errors">
                    {hasSubmitted && errors.length > 0 && (
                        <ul>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <form onSubmit={onSubmit}>
                    <div>
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
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        // required
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        // required
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        // required
                        />
                        <input
                            type="number"
                            placeholder="Zip Code"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                        // required
                        />
                        <input
                            type="number"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        // required
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        // required
                        />
                        <label>
                            Select a Price Range
                            <select
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                                {PRICES.map(price => (
                                    <option
                                        key={price}
                                        value={price}
                                    >
                                        {price}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <input
                            type="url"
                            placeholder="Image URL"
                            value={previewImageUrl}
                            onChange={(e) => setPreviewImageUrl(e.target.value)}
                        // required
                        />
                    </div>
                    <div>
                        <button type="submit"
                            disabled={hasSubmitted && errors.length > 0}
                        >Submit Business
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBusinessForm
