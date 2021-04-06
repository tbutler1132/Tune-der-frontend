import React from 'react';

import Profile from '../Profile/Profile'
import Settings from './Settings'

function UserProfileContainer(props) {
    console.log(props)
    return (
        <div>
            {props.currentUser ?
                <>
                <Profile user={props.currentUser}/>
                <Settings />
                </>
            :
                <p>loading</p>}
        </div>
    );
}

export default UserProfileContainer;