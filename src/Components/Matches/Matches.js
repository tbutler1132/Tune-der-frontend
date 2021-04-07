import React from 'react';

function Matches(props) {

    console.log(props.currentUser)
    
    //Combine 'matchee' and 'matcher' to create an array of all current user matches
    const matches = props.currentUser.first.concat(props.currentUser.second)

    const renderMatches = () => {
        return matches.map(match => <p key={match.id}>{match.name}</p>)
    }

    return (
        <div>
            <h5>Your Matches</h5>
            {renderMatches()}
        </div>
    );
}

export default Matches;