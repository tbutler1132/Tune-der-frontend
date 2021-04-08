import React from 'react';

import Profile from '../Profile/Profile'
import Settings from './Settings'

function UserProfileContainer(props) {

    return (
        <div>
            {props.currentUser ?
                <>
                <Profile user={props.currentUser}/>
                <p>Click to Edit Profile</p>
                <Settings />
                </>
            :
                <p>loading</p>}
        </div>
    );
}

export default UserProfileContainer;