import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';

import { signUp } from '../../store/session';

import signUpImage from '../../icons/login-signup-img.png';

import "./SignUpForm.css";

const SignUpForm = () => {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    let errors = [];

    if (!first_name) errors.push("Please provide a first name");
    if (first_name.length > 50) errors.push("First name cannot be over 50 characters long")
    if (!last_name) errors.push("Please provide a last name");
    if (last_name.length > 50) errors.push("Last name cannot be over 50 characters long")
    if (!username) errors.push("Please provide a username");
    if (username.length > 50) errors.push("Username cannot be over 50 characters long")
    if (!email) errors.push("Please provide a email");
    if (email.length > 255) errors.push("Email cannot be over 255 characters long")
    if (!password.length) errors.push("Password is required");
    if (password.length < 5 || password.length > 30) errors.push("Password must be between 5 to 30 characters")
    if (!repeatPassword.length) errors.push("Please confirm the password")
    // if (password !== repeatPassword) errors.push("Passwords do not match");

    setErrors(errors)

  }, [username, first_name, last_name, password, repeatPassword, email])


  const onSignUp = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (errors.length > 0) {
      return alert(
        "There was an error with your submission, Please recheck your inputs"
      );
    }

    if (!email.includes("@")) {
      return setErrors(["Please enter a valid email address"]);
    }

    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, first_name, last_name, email, profileImageUrl, password)
      );
      if (data) {
        setErrors(data)
      }
    } else {
      return setErrors(['Passwords do not match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateProfileImageUrl = (e) => {
    setProfileImageUrl(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (sessionUser) {
    return <Redirect to='/restaurants' />;
  }

  return (
    <div className='signup-form-container'>
      <div className='signup-form-wrapper'>
        <div className='signup-form-left'>
          <h2 style={{ color: '#7db40f' }}>Sign Up for Kelp</h2>
          <div className='signup-message'>
            <div style={{ fontWeight: "500" }}>Connect with great local seafood</div>
          </div>
          <form className='signup-form-inputs' onSubmit={onSignUp}>
            <div className='signup-form-errors'>
              {hasSubmitted && errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='signup-first-last-input'>
              <div className='signup-input-field-first-last'>
                <input
                  type="text"
                  name="first_name"
                  placeholder='First Name'
                  onChange={updateFirstName}
                  value={first_name}
                  autoComplete="first_name"
                // required={true}
                ></input>
              </div>
              <div className='signup-input-field-first-last' >
                <input
                  type="text"
                  name="last_name"
                  placeholder='Last Name'
                  autoComplete="last_name"
                  onChange={updateLastName}
                  value={last_name}
                // required={true}
                ></input>
              </div>
            </div>
            <div className='signup-input-field'>
              <input
                type='text'
                name='username'
                placeholder='User Name'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='signup-input-field'>
              <input
                type='text'
                name='email'
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='signup-input-field'>
              <input
                type="text"
                name="previewImageUrl"
                placeholder='Profile Picture (Optional)'
                autoComplete="previewImageUrl"
                onChange={updateProfileImageUrl}
                value={profileImageUrl}
              ></input>
            </div>
            <div className='signup-input-field'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='signup-input-field'>
              <input
                type='password'
                name='repeat_password'
                placeholder='Confirm Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
              // required={true}
              ></input>
            </div>
            <div className='signup-form-bttn-container'>
              <button
                className='signup-form-bttn'
                type='submit'
                disabled={hasSubmitted && errors.length > 0}
              >Sign Up
              </button>
            </div>
            <div className='signup-form-login-message'>
              <div style={{ color: 'gray' }}>Already on Kelp?</div>
              <div>
                <NavLink className='new-to-kelp-link' to='/login'>Log in</NavLink>
              </div>
            </div>
          </form>
        </div>
        <div className='signup-form-right'>
          <img className='signup-form-pic' src={signUpImage}></img>
        </div>
      </div>
    </div>

  );
};

export default SignUpForm;
