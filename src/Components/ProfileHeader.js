import React from 'react';

function ProfileHeader(props) {
    return (
        <div>
            <h1>{props.currentUser.name}</h1>
        </div>
    );
}

export default ProfileHeader;