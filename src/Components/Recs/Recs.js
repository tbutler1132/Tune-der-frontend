import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import Profile from '../Profile/Profile'
import MatchButtons from '../Matches/MatchButtons'

function Recs(props) {
//This component is also a bit of a data handler, taking all users' profiles and performing an algorithm to display ONE to the current user
//Once it has calculated a user to display, it displays that one user
//It also renders Match Buttons which will perform the core matching functionality of the app

    const [displayedUser, changeDisplayedUser] = useState(false)
    
//  When the component mounts select a user for their profile to be displayed.
    useEffect(() => {
        pickPotentialMatch()
    }, [])

//Right now the algo is random but it will be updated to match alike profiles
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