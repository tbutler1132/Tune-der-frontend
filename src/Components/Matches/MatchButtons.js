import React from 'react';
import { connect } from 'react-redux'

import GradeIcon from '@material-ui/icons/Grade';
import CloseIcon from '@material-ui/icons/Close';

function MatchButtons(props) {
//The match buttons are responsible for:
//1. Triggering the render of a new user to display
//2. Updating a users' likes 

//Determine if the current user has previously liked the currently displayed user// BACKEND
    const displayedUserHasLikedCurrentUser = () => {
        const likersIds = props.currentUser.likers.map(likers => likers.id)
        return likersIds.includes(props.displayedUser.id)
    }

// ------Add new Like to the database------

    const addLikeToDatabase = () => {

        props.pickPotentialMatch()

        const newLike = {
            liker_id: props.currentUser.id,
            liked_id: props.displayedUser.id,
        }

        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ like: newLike })
        }

        fetch("http://localhost:3000/likes", options)
        .then(r => r.json())
        .then(data => {
            props.addNewLike(data)
            if (displayedUserHasLikedCurrentUser()){
                props.addNewMatch(data)
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }

//If the users are a match just automatically create a new convo
    const createNewConversation = () => {

    }

    return (
        <div>
            <CloseIcon onClick={props.pickPotentialMatch}/>
            <GradeIcon onClick={addLikeToDatabase}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => {
    return {
        addNewLike: (likeObj) => dispatch({type: "add_like", payload: likeObj}),
        addNewMatch: (matchObj) => dispatch({type: "add_match", payload: matchObj})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(MatchButtons)