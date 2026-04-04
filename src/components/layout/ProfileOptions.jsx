'use client';
  import React, { useContext, useEffect, useRef, useState } from 'react';
import ProfileOverlay from "./ProfileOverlay";
import ConfirmationButton from "../elements/ConfirmationButton";
import AuthContext from "../../global_quantity/AuthContext";
import { useProfile } from '../../global_quantity/ProfileContext';

const ProfileOptions = () => {
    const {auth_in_context, userData, logout_auth} = useContext(AuthContext);
    const {closeProfile} = useProfile();
    const username = userData?.username;
    const logout = () => {
        logout_auth();
        closeProfile();
    }

    return(
        <ProfileOverlay header={"Hello, " + username + " !"} >
            <div className='profile_option'>
                <ConfirmationButton
                    text="Logout"
                    fnc={logout}
                />
            </div>
        </ProfileOverlay>
    )
}

export default ProfileOptions;