import React from 'react';

function ProfileHeader(props) {
    return (
        <div onClick={() => props.history.push(`/app/${props.path}`)} className="header">
            <h1>{props.currentUser.name}</h1>
        </div>
    );
}

export default ProfileHeader;