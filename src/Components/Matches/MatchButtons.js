import React from 'react';
import { connect } from 'react-redux'

import GradeIcon from '@material-ui/icons/Grade';
import CloseIcon from '@material-ui/icons/Close';
import { addNewMatch } from '../../Redux/actions';

function MatchButtons(props) {
//The match buttons are responsible for:
//1. Triggering the render of a new user to display
//2. Updating a users' likes and matches

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
            console.log(data)
            props.addNewLike(data)
        })
        .catch(error => {
            console.log('Error:', error);
        });

        if (displayedUserHasLikedCurrentUser()){
            const newMatch = {
                first_id: props.displayedUser.id,
                second_id: props.currentUser.id
            }

            const options = {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
                },
                body: JSON.stringify({ match: newMatch })
            }

            fetch("http://localhost:3000/matches", options)
            .then(r => r.json())
            .then(data => {
                console.log(data)
                props.addNewMatch(data)
            })
            .catch(error => {
                console.log('Error:', error);
            });
        }
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