import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getUsers} from '../../Redux/actions'

import Recs from './Recs'
import Matches from '../Matches/Matches'
import Messages from '../Messages/Messages'
import ProfileHeader from '../ProfileHeader'


function RecsContainer(props) {

console.log(props.currentUser)

//Destructure props
const { currentUser } = props

// Fetch users so their profiles can potentially be displayed
    useEffect(() => {
        props.fetchUsers()
    }, [])

    return (
        props.users.length > 0 ?
        <div className="recs-container">
            <div className="left-side">
                <ProfileHeader currentUser={props.currentUser} />
                <Matches currentUser={currentUser}/>
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
    return {users: state.users}
}

//Fetch users from database
const mapDispatchToProps = (dispatch) => {
    return {fetchUsers: () => dispatch(getUsers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecsContainer);