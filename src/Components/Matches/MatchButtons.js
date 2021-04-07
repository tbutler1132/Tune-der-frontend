import React from 'react';

import GradeIcon from '@material-ui/icons/Grade';
import CloseIcon from '@material-ui/icons/Close';

function MatchButtons(props) {



    //Try to refactor
    const displayedUserHasLikedCurrentUser = () => {
        const likersIds = props.currentUser.likers.map(likers => likers.id)
        return likersIds.includes(props.displayedUser.id)
    }

    // Add Like/Match to the database
    const addLikeToDatabase = () => {
    
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
        })
        .catch(error => {
            console.log('Error:', error);
        });

        if (displayedUserHasLikedCurrentUser){
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
            })
            .catch(error => {
                console.log('Error:', error);
            });
        }
    }

    return (
        <div>
            <CloseIcon onClick={props.pickPotentialMatch}/>
            <GradeIcon onClick={props.pickPotentialMatch, addLikeToDatabase}/>
        </div>
    );
}

export default MatchButtons;