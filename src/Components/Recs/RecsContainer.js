import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {getUsers} from '../../Redux/actions'

import Profile from '../Profile/Profile'
import Matches from './Matches'
import Messages from './Messages'
import MatchButtons from './MatchButtons'

function RecsContainer(props) {

    const [displayedUser, changeDisplayedUser] = useState({})

    useEffect(() => {
        props.fetchUsers()
    }, [])

    //Display a potential match, right now the algorithm is just completely randomized
    const renderPotentialMatchProfile = () => {
        const float = Math.random() * (props.users.length - 0) + 0;
        if (props.users[Math.floor(float)].id === props.currentUser.id){
            renderPotentialMatchProfile()
        } else {
            console.log("they are not equal")
            return (<Profile user={props.users[Math.floor(float)]}/>)
        }
    }

    const pickRandomUser = () => {
        const float = Math.random() * (props.users.length - 0) + 0;
        return props.users[Math.floor(float)]
    }

    return (
        props.users.length > 0 ?
        <div>
            <h1>Recs Container</h1>
            {renderPotentialMatchProfile()}
            <MatchButtons showNewProfile={renderPotentialMatchProfile}/>
            <Matches />
            <Messages />
        </div>
        :
        <p>Loading...</p>
    );
}

const mapStateToProps = (state) => {
    return {users: state.users}
}

const mapDispatchToProps = (dispatch) => {
    return {fetchUsers: () => dispatch(getUsers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecsContainer);