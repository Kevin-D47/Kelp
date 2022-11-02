import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import { login } from '../../store/session';

import loginImage from '../../icons/login-signup-img.png';

import './LoginForm.css'

const LoginForm = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    let errors = [];

    if (!email) errors.push("Please input your email");
    if (!password) errors.push("Please input your password");

    setErrors(errors)

  }, [email, password])


  const onLogin = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (!email.includes("@")) {
      return setErrors(["Please enter a valid email address"]);
    }

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/restaurants' />;
  }

  return (
    <div className='login-form-container'>
      <div className='login-form-wrapper'>
        <div className='login-form-right'>
          <h2 style={{ color: '#7db40f' }}>Login to Kelp</h2>
          <div className='login-message'>
            <div style={{ fontWeight: "500" }}>New to Kelp?</div>
            <div>
              <NavLink className='new-to-kelp-link' to='/sign-up'>Sign Up</NavLink>
            </div>
          </div>
          <form className='login-form-inputs' onSubmit={onLogin}>
            <div className='login-form-errors'>
              {hasSubmitted && errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='login-input-field'>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='login-input-field'>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button
              className='login-form-bttn'
              type='submit'
              disabled={hasSubmitted && errors.length > 0}
              >Login
            </button>
            <button className='login-form-bttn' onClick={(e) => {
              setEmail('demo@aa.io');
              setPassword('password')
            }}>Demo Login</button>
          </form>
        </div>
        <div className='login-form-left'>
          <img className='login-form-pic' src={loginImage}></img>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
