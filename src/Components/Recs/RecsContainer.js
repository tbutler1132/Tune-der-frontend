import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getUsers} from '../../Redux/actions'

import Recs from './Recs'
import Matches from '../Matches/Matches'
import Messages from '../Messages/Messages'
import ProfileHeader from '../ProfileHeader'


function RecsContainer(props) {
//The primary responsiblity of this component is to fetch and organize data to be passed down to children of the rec container


//Destructure props
    const { currentUser } = props

// Fetch users so their profiles can potentially be displayed
    useEffect(() => {
        props.fetchUsers()
    }, [])

//Combine 'matchee' and 'matcher' to create an array of all current user matches
    const matches = props.currentUser?.first.concat(props.currentUser.second)

    return (
        props.users.length > 0 ?
        <div className="recs-container">
            <div className="left-side">
                <ProfileHeader currentUser={currentUser} />
                <Matches matches={matches} currentUser={currentUser}/>
                <Messages />
            </div>
            <div className="recs">
                <Recs currentUser={currentUser}/>
            </div>
        </div>
        :
        <p>Loading...</p>
    );
}

//Add state of users to props
const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
}

//Fetch users from database
//* USE REDUCER TO REMOVE CURRENT USER PROFILE *//
const mapDispatchToProps = (dispatch) => {
    return {fetchUsers: () => dispatch(getUsers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecsContainer);