import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";

import brokenImg from '../../icons/broken-img-icon.png'

import "./ProfileButton.css";

const ProfileButton = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/");
    };

    return (
        <div>
            <div className="profile-button-border" onClick={openMenu}>
                <img
                    className="profile-icon"
                    src={sessionUser.profileImageUrl}
                    alt={brokenImg}
                    onError={e => { e.currentTarget.src = brokenImg }}
                />
            </div>
            {showMenu && (
                <div className="profile-dropdown">
                    {sessionUser && (
                        <div className="profile-list">
                            <div className="user-name-li">
                                Hello&nbsp;<div className='drop-down-username'>{sessionUser.username}</div>
                            </div>
                            <div className="hover-link about-me-li">
                                <NavLink style={{color:'black'}} to={`/users/${sessionUser.id}`}>
                                    About Me
                                </NavLink>
                            </div>
                            <div className="hover-link logout-li" onClick={logout}>
                                Log Out
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )

}

export default ProfileButton
