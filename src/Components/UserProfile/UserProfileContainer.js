import React from 'react';
import {Route, Link, Switch} from 'react-router-dom'
import {Button} from '@material-ui/core'

import Profile from '../Profile/Profile'
import EditProfile from './EditProfile'
import Sidebar from '../Sidebar/Sidebar'

function UserProfileContainer(props) {

    return (
        <div className="user-container">
            {props.currentUser ?
                <>
                <Sidebar history={props.history} currentUser={props.currentUser}/>
                <div className="recs">
                    <Switch>
                        <Route path="/app/profile/edit" render={() =><EditProfile history={props.history} currentUser={props.currentUser} />}/>
                        <div className="profile-and-buttons">
                            <Profile user={props.currentUser}/>
                            <Button id="edit-profile-button">
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/app/profile/edit/bio">Edit Profile</Link>
                            </Button>
                        </div>
                    </Switch>
                </div>
                </>
            :
                <p>loading</p>}
        </div>
    );
}

export default UserProfileContainer;