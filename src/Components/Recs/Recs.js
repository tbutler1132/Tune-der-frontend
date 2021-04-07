import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import Profile from '../Profile/Profile'
import MatchButtons from '../Matches/MatchButtons'

function Recs(props) {

    const [displayedUser, changeDisplayedUser] = useState(false)

    //  When the component mounts select a user for their profile to be displayed. Right now it is random but algorithm will
    //be updated to match alike profiles
    useEffect(() => {
        const float = Math.random() * (props.users.length - 0) + 0;
        changeDisplayedUser(props.users[Math.floor(float)])
    }, [])

    const pickRandomUser = () => {
        const float = Math.random() * (props.users.length - 0) + 0;
        changeDisplayedUser(props.users[Math.floor(float)])
    }

    return (
        displayedUser  ?
            <div>
                <Profile currentUser={props.currentUser} user={displayedUser}/>
                <MatchButtons currentUser={props.currentUser} displayedUser={displayedUser} pickRandomUser={pickRandomUser}/>
            </div>
        :
        <p>Loading</p>
    );
}

const mapStateToProps = (state) => {
    return {users: state.users}
}

export default connect(mapStateToProps)(Recs);