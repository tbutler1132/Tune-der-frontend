import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getUsers} from '../../Redux/actions'

// import Profile from '../Profile/Profile'
import Matches from './Matches'
import Messages from './Messages'

function RecsContainer(props) {

    useEffect(() => {
        props.fetchUsers()
    }, [])

    return (
        <div>
            <h1>Recs Container</h1>
            <Matches />
            <Messages />
            {/* <Profile /> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {users: state.users}
}

const mapDispatchToProps = (dispatch) => {
    return {fetchUsers: () => dispatch(getUsers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecsContainer);