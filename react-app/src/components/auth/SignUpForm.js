import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, first_name, last_name, email, profileImageUrl, password));
      if (data) {
        setErrors(data)
      }
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

  if (user) {
    return <Redirect to='/restaurants' />;
  }

  return (
    <div className='signup-form-container'>
      <div className='signup-form-wrapper'>
        <div className='signup-form-left'>
          <h2 style={{ color: '#d32323' }}>Sign Up for Kelp</h2>
          <div className='signup-message'>
            <div style={{ fontWeight: "500" }}>Connect with great local seafood</div>
          </div>
          <form className='signup-form-inputs' onSubmit={onSignUp}>
            <div className='signup-form-errors'>
              {errors.map((error, ind) => (
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
                  required={true}
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
                  required={true}
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
                placeholder='Profile Picture'
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
                required={true}
              ></input>
            </div>
            <button className='signup-form-bttn' type='submit'>Sign Up</button>
            <div className='signup-form-login-message'>
            <div style={{color: 'gray'}}>Already on Kelp?</div>
            <div>
              <NavLink className='new-to-kelp-link' to='/login'>Log in</NavLink>
            </div>
          </div>
          </form>
        </div>
        <div className='signup-form-left'>
          <img className='signup-form-pic' src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png'></img>
        </div>
      </div>
    </div>

  );
};

export default SignUpForm;
