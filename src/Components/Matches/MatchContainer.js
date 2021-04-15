import React, {useEffect, useState} from 'react';

import Profile from '../Profile/Profile'
import Sidebar from '../Sidebar/Sidebar'

function MatchContainer(props) {
    const [matchProfile, setMatchProfile] = useState(false)

    console.log(props.id)

    useEffect(() => {
        getMatchProfile()
    },[])

    const getMatchProfile = () => {
        fetch(`http://localhost:3000/users/${props.id}`)
        .then(r => r.json())
        .then(data => 
            {   console.log(data)
                setMatchProfile(data)
            }
        )
    }

    console.log(matchProfile)

    return (
        matchProfile ?
        <div className="recs-container">
            <Sidebar history={props.history} currentUser={props.currentUser} />
            <div className="recs">
            <Profile currentUser={props.currentUser} user={matchProfile}/>
            </div>
        </div>
        :
        <p>Loading</p>
    );
}

export default MatchContainer;