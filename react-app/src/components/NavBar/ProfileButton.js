import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

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
                    alt=""
                />
            </div>
            {showMenu && (
                <div className="profile-dropdown">
                    {sessionUser && (
                        <div className="profile-list">
                            <div className="user-name-li">
                                Hello {sessionUser.username}
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
