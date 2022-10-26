import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
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
          <h2 style={{color: '#d32323'}}>Login to Kelp</h2>
          <div className='login-message'>
            <div style={{fontWeight:"500"}}>New to Kelp?</div>
            <div>
              <NavLink className='new-to-kelp-link' to='/sign-up'>Sign Up</NavLink>
            </div>
          </div>
          <form className='login-form-inputs' onSubmit={onLogin}>
            <div className='login-form-errors'>
              {errors.map((error, ind) => (
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
            <button className='login-form-bttn' type='submit'>Login</button>
            <button className='login-form-bttn' onClick={(e) => {
              setEmail('demo@aa.io');
              setPassword('password')
            }}>Demo Login</button>
          </form>
        </div>
        <div className='login-form-left'>
            <img className='login-form-pic' src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png'></img>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
