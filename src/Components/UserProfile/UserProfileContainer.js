import React from 'react';
import {Route, Link, Switch} from 'react-router-dom'

import Profile from '../Profile/Profile'
import Settings from './Settings'
import ProfileHeader from '../ProfileHeader'
import EditProfile from './EditProfile'
import Sidebar from '../Sidebar/Sidebar'

function UserProfileContainer(props) {

    return (
        <div >
            {props.currentUser ?
                <>
                <div >
                    <Sidebar history={props.history} currentUser={props.currentUser}/>
                </div>
                <div className="recs">
                    <Switch>
                        <Route path="/app/profile/edit" render={() =><EditProfile history={props.history} currentUser={props.currentUser} />}/>
                        <>
                        <Profile user={props.currentUser}/>
                        <Link to="/app/profile/edit/bio">Edit Profile</Link>
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