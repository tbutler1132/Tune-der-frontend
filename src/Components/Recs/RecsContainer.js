import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {getUsers} from '../../Redux/actions'
import {LinearProgress} from '@material-ui/core'


import Recs from './Recs'
import Matches from '../Matches/Matches'
import ConversationsContainer from '../Messages/ConversationsContainer'
import ProfileHeader from '../ProfileHeader'
// import Profile from '../Profile/Profile'



function RecsContainer(props) {
//The primary responsiblity of this component is to fetch and organize data to be passed down to children of the rec container

//State
    const [matchesOrMessages, toggleMatchesOrMessages] = useState("matches")


//Destructure props
    const { currentUser, fetchUsers, otherUsers } = props

// I want to fetch only users that have not yet been matched with current user
    useEffect(() => {
        fetchUsers(currentUser)
    }, [currentUser, fetchUsers])
    

//Find intesection of current user likers and liked to obtain matches
    // const matches = currentUser.liker.filter(user => currentUser.liked.includes(user))

//Toggle Matches
    const toggleMatches = () => {
        toggleMatchesOrMessages("matches")
    }
    
    const toggleMessages = () => {
        toggleMatchesOrMessages("messages")
    }



//Remove already matched users from potential matches//MOVE TO BACKEND
    const potentialMatches = () => {
        const nonMatchedOtherUsers = [...otherUsers]
        for( let i = nonMatchedOtherUsers.length - 1; i >= 0; i--){
            for ( let j=0; j < currentUser.matches.length; j++){
                if (nonMatchedOtherUsers[i] && (nonMatchedOtherUsers[i].id === currentUser.matches[j].id)){
                    nonMatchedOtherUsers.splice(i, 1);
                }
            }
        }
        return nonMatchedOtherUsers
    }

    return (
        otherUsers.length > 0 ?
        <div className="recs-container">
            <div className="left-side">
                <ProfileHeader path={"profile"} history={props.history} currentUser={currentUser} />
                <div className="matches-messages-buttons">
                    <button onClick={toggleMatches}>Matches</button>
                    <button  onClick={toggleMessages}>Messages</button>
                </div>
                {matchesOrMessages === "matches" ? 
                    <Matches  matches={currentUser.matches} currentUser={currentUser}/>
                :
                    <ConversationsContainer currentUser={currentUser}/>
                }
            </div>
            <div className="recs">
                <Recs potentialMatches={potentialMatches()} currentUser={currentUser}/>
            </div>
        </div>
        :
        <LinearProgress />
    );
}

//Add state of users to props
const mapStateToProps = (state) => {
    return {
        otherUsers: state.otherUsers,
        currentUser: state.currentUser
    }
}

//Fetch users from database
//* USE REDUCER TO REMOVE CURRENT USER PROFILE *//
const mapDispatchToProps = (dispatch) => {
    return {fetchUsers: (currentUserObj) => dispatch(getUsers(currentUserObj))}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecsContainer);