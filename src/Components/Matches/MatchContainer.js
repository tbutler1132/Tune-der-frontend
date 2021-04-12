import React, {useEffect, useState} from 'react';

import Profile from '../Profile/Profile'

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
        <div>
            <p>Test</p>
            <Profile currentUser={props.currentUser} user={matchProfile}/>
        </div>
        :
        <p>Loading</p>
    );
}

export default MatchContainer;