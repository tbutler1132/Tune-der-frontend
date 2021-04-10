import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getUsers} from '../../Redux/actions'
import {LinearProgress} from '@material-ui/core'

import Recs from './Recs'
import Matches from '../Matches/Matches'
import Messages from '../Messages/Messages'
import ProfileHeader from '../ProfileHeader'


function RecsContainer(props) {
//The primary responsiblity of this component is to fetch and organize data to be passed down to children of the rec container


//Destructure props
    const { currentUser, fetchUsers, otherUsers } = props

// I want to fetch only users that have not yet been matched with current user
    useEffect(() => {
        fetchUsers(currentUser)
    }, [currentUser, fetchUsers])
    

//Find intesection of current user likers and liked to obtain matches
    const matches = currentUser.liker.filter(user => currentUser.liked.includes(user))


//Remove already matched users from potential matches//MOVE TO BACKEND
    const removeMatches = () => {
        const nonMatchedOtherUsers = [...otherUsers]
        for( let i = nonMatchedOtherUsers.length - 1; i >= 0; i--){
            for ( let j=0; j < currentUser.liked.length; j++){
                if (nonMatchedOtherUsers[i] && (nonMatchedOtherUsers[i].id === currentUser.liked[j].id)){
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
                <ProfileHeader currentUser={currentUser} />
                <Matches matches={matches} currentUser={currentUser}/>
                <Messages />
            </div>
            <div className="recs">
                <Recs potentialMatches={removeMatches()} currentUser={currentUser}/>
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