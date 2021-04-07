import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getUsers} from '../../Redux/actions'

import Recs from './Recs'
import Matches from '../Matches/Matches'
import Messages from '../Messages/Messages'


function RecsContainer(props) {

    //Destructure props
    const { currentUser } = props

// Fetch users so their profiles can potentially be displayed
    useEffect(() => {
        props.fetchUsers()
    }, [])

    return (
        props.users.length > 0 ?
        <div>
            <h1>Recs Container</h1>
            <Recs currentUser={currentUser}/>
            <Matches currentUser={currentUser}/>
            <Messages />
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