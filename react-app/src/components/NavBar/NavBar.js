import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { getAllUsersThunk } from '../../store/users';
import { getAllBusinessesThunk } from '../../store/businesses';

import SearchBar from '../SearchBar/searchBar';

import * as sessionActions from "../../store/session";

import ProfileButton from './ProfileButton'

import LogoutButton from '../auth/LogoutButton'

import kelpLogo from "../../icons/kelp-logo-title.png";

import "./NavBar.css";


const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBusinessesThunk());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  if (sessionUser) {
    return (
      <nav className='nav-container-auth'>
        <div className='nav-left-container-auth'>
          <NavLink to='/restaurants'>
            <img className='nav-logo' src={kelpLogo}></img>
          </NavLink>
        </div>
        <div>
          <SearchBar/>
        </div>
        <div className='nav-right-container-auth'>
          <div className='profile-createBus-container-auth'>
            <NavLink to="/new">
              <div className="create-bus-bttn">Start a Business</div>
            </NavLink>
            <ProfileButton sessionUser={sessionUser} />
          </div>
        </div>
      </nav>
    );
  } if (!sessionUser) {
    return (
      <nav className='nav-container-noAuth'>
        <div className='nav-wrapper-noAuth'>
          <div className='nav-left-container-noAuth'>
            <div>
              <NavLink to='/'>
                <img className='nav-logo' src={kelpLogo}></img>
              </NavLink>
            </div>
          </div>
          <div className='nav-right-container-noAuth'>
            <div className='login-signup-container-noAuth'>
              <NavLink to='/login' >
                <div className='login-bttn'>Login</div>
              </NavLink>
              <NavLink to='/sign-up'>
                <div className='signup-bttn'>Sign Up</div>
              </NavLink>
            </div>
          </div>
        </div>

      </nav>
    );
  };
}

export default NavBar;
