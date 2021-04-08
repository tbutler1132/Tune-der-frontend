import React from 'react';
import {Route, Link, Switch} from 'react-router-dom'

import Profile from '../Profile/Profile'
import Settings from './Settings'
import ProfileHeader from '../ProfileHeader'
import EditProfile from './EditProfile'

function UserProfileContainer(props) {

    return (
        <div>
            {props.currentUser ?
                <>
                <div className="left-side">
                    <ProfileHeader currentUser={props.currentUser}/>
                    <Settings />
                </div>
                <div className="recs">
                    <Switch>
                        <Route path="/app/profile/edit" render={() =><EditProfile />}/>
                        <>
                        <Profile user={props.currentUser}/>
                        <Link to="/app/profile/edit">Edit Profile</Link>
                        </>
                    </Switch>
                </div>
                </>
            :
                <p>loading</p>}
        </div>
    );
}

export default UserProfileContainer;