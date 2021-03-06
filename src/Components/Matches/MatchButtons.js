import React from 'react';
import { connect } from 'react-redux'

import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';

function MatchButtons(props) {
//The match buttons are responsible for:
//1. Triggering the render of a new user to display
//2. Updating a users' likes 

//Determine if the current user has previously liked the currently displayed user// BACKEND
    const displayedUserHasLikedCurrentUser = () => {
        const likersIds = props.currentUser.likers.map(likers => likers.id)
        return likersIds.includes(props.match.id)
    }

// ------Add new Like to the database------
// If they liked user has already liked the current user, add new match in state

    const addLikeToDatabase = () => {

        props.resetPotentialMatch()

        const newLike = {
            liker_id: props.currentUser.id,
            liked_id: props.match.id,
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
            console.log(data)
            props.addNewLike(data)
            if (displayedUserHasLikedCurrentUser()){
                props.addNewMatch(data)
                createNewConversation()
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });


    }

// If the users are a match just automatically create a new convo
    const createNewConversation = () => {
        const newConversation = {
            sender_id: props.currentUser.id,
            reciever_id: props.match.id,
        }

        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ conversation: newConversation })
        }

        fetch("http://localhost:3000/conversations", options)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            props.addNewConversation(data)
  
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }

    return (
        <div className="match-buttons">
            <CloseIcon fontSize="large" onClick={props.incrementMatchIndex}/>
            <FavoriteIcon color="secondary" fontSize="large" onClick={addLikeToDatabase}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => {
    return {
        addNewLike: (likeObj) => dispatch({type: "add_like", payload: likeObj}),
        addNewMatch: (matchObj) => dispatch({type: "add_match", payload: matchObj}),
        addNewConversation: (convoObj) => dispatch({type: "add_convo", payload: convoObj})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(MatchButtons)