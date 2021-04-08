import React from 'react';

function Matches(props) {
//This component takes the matches gathered in the RecsContainer and renders them 
    
    const renderMatches = () => {
        return props.matches.map(match => <p key={match.id}>{match.name}</p>)
    }

    return (
        <div>
            <h5>Your Matches</h5>
            {renderMatches()}
        </div>
    );
}

export default Matches;