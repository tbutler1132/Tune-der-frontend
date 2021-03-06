import React from 'react';
import {Link} from 'react-router-dom'

function Matches(props) {
//This component takes the matches gathered in the RecsContainer and renders them 

console.log(props.matches)
    
    const renderMatches = () => {
        return props.matches.map(match =>
            <div className="matches-display" key={match.id}>
            <img src={`http://localhost:3000/${match.avatar}`} alt="" width="50px" height="50px"/>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/match/${match.id}`} key={match.id}>{match.name}</Link>
            </div>
        )
    }

    return (
        <div>
            <h5 style={{color: 'pink', font: 'bold'}}>Your Matches</h5>
            {renderMatches()}
        </div>
    );
}

export default Matches;