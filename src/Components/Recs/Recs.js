import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import Profile from '../Profile/Profile'
import MatchButtons from '../Matches/MatchButtons'

function Recs(props) {

    const [displayedUser, changeDisplayedUser] = useState(false)
    
    const matches = props.currentUser.first.concat(props.currentUser.second)

    //  When the component mounts select a user for their profile to be displayed.
    useEffect(() => {
        pickPotentialMatch()
    }, [])

    //Right now it is random but algorithm will be updated to match alike profiles
    const pickPotentialMatch = () => {
        const float = Math.random() * (props.users.length - 0) + 0;
        changeDisplayedUser(props.users[Math.floor(float)])
    }

    return (
        displayedUser  ?
            <div>
                <Profile currentUser={props.currentUser} user={displayedUser}/>
                <MatchButtons currentUser={props.currentUser} displayedUser={displayedUser} pickPotentialMatch={pickPotentialMatch}/>
            </div>
        :
        <p>Loading</p>
    );
}

const mapStateToProps = (state) => {
    return {users: state.users}
}

export default connect(mapStateToProps)(Recs);