import React from 'react';
import {Route, Switch} from 'react-router-dom'

import EditProfileInfo from './EditProfileInfo'
import AddFavoriteSong from './AddFavoriteSong'

function EditProfile(props) {
    return (
        <div>
            <Switch>
                <Route path="/app/profile/edit/bio" render={() => <EditProfileInfo history={props.history} currentUser={props.currentUser}/>}/>
                <Route path="/app/profile/edit/favorite" render={() =><AddFavoriteSong currentUser={props.currentUser} />}/>
            </Switch>
        </div>
    );
}

export default EditProfile;