import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import Profile from '../Profile/Profile'
import MatchButtons from '../Matches/MatchButtons'

function Recs(props) {
//This component is also a bit of a data handler, taking all users' profiles and performing an algorithm to display ONE to the current user
//Once it has calculated a user to display, it displays that one user
//It also renders Match Buttons which will perform the core matching functionality of the app

    const {potentialMatches, currentUser} = props

//---State---//
    // const [displayedUser, changeDisplayedUser] = useState(false)
    const [displayedProfileIndex, incrementIndex] = useState(0)

    console.log(displayedProfileIndex)
    console.log(potentialMatches.length)
    
//  When the component mounts select a user for their profile to be displayed.

    // useEffect(() => {
    //     pickPotentialMatch()
    // }, [])

//We collect potential matches from the backend, then this function will pick a random one to display to the user
    // const pickPotentialMatch = () => {
    //     const float = Math.random() * (potentialMatches.length - 0) + 0;
    //     changeDisplayedUser(potentialMatches[Math.floor(float)])
    // }

    const incrementPotentialMatch = () => {
        if(displayedProfileIndex === potentialMatches.length - 1){
            incrementIndex(0)
        } else {
            incrementIndex(displayedProfileIndex + 1)
        }
    }

    const resetPotentialMatch = () => {
        incrementIndex(0)
    }

    return (
        // displayedUser  ?
            <div className="profile-and-buttons">
                <Profile currentUser={currentUser} user={potentialMatches[displayedProfileIndex]}/>
                <MatchButtons resetPotentialMatch={resetPotentialMatch} match={potentialMatches[displayedProfileIndex]} incrementMatchIndex={incrementPotentialMatch} currentUser={currentUser}/>
            </div>
        // :
        // <p>Loading</p>
    );
}

const mapStateToProps = (state) => {
    return {otherUsers: state.otherUsers}
}

export default connect(mapStateToProps)(Recs);