import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {getUsers} from '../../Redux/actions'
import {LinearProgress} from '@material-ui/core'


import Recs from './Recs'
import Sidebar from '../Sidebar/Sidebar'



function RecsContainer(props) {
//The primary responsiblity of this component is to fetch and organize data to be passed down to children of the rec container

                                //---State---//

//Toggle matches/messages on left side of screen
    const [matchesOrMessages, toggleMatchesOrMessages] = useState("matches")
    const [test, triggerTest] = useState(false)

//---Props---//
    const { currentUser, fetchUsers, otherUsers } = props

// Fetch users, slice current user in reducer
    useEffect(() => {
        fetchUsers(currentUser)
    }, [])

//Remove already matched users from potential matches//REFACTOR
    const potentialMatches = () => {
        const nonMatchedOtherUsers = [...otherUsers]
        const matchedOrLiked = currentUser.matches.concat(currentUser.liked)
        for( let i = nonMatchedOtherUsers.length - 1; i >= 0; i--){
            for ( let j=0; j < matchedOrLiked.length; j++){
                if (nonMatchedOtherUsers[i] && (nonMatchedOtherUsers[i].id === matchedOrLiked[j].id)){
                    nonMatchedOtherUsers.splice(i, 1);
                }
            }
        }
        return nonMatchedOtherUsers
    }

    console.log(otherUsers)

    return (
        otherUsers.length > 0 ?
        <div className="recs-container">
            <Sidebar history={props.history} currentUser={currentUser} />
            {potentialMatches().length > 0 ? 
            <div className="recs">
                <Recs fetchMoreUsers={props.fetchUsers} potentialMatches={potentialMatches()} currentUser={currentUser}/>
            </div>

        :
        <p>Sorry, no one is here right now :/</p>
        }
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