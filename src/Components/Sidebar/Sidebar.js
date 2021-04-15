import React, {useState} from 'react';

import Matches from '../Matches/Matches'
import ConversationsContainer from '../Messages/ConversationsContainer'
import ProfileHeader from '../ProfileHeader'

function Sidebar(props) {

    const [matchesOrMessages, toggleMatchesOrMessages] = useState("matches")

    const { currentUser } = props


    const toggleMatches = () => {
        toggleMatchesOrMessages("matches")
    }
    
    const toggleMessages = () => {
        toggleMatchesOrMessages("messages")
    }


    return (
        <div className="left-side">
            <ProfileHeader path={"profile"} history={props.history} currentUser={currentUser} />
            <div className="matches-messages-buttons">
                <button onClick={toggleMatches}>Matches</button>
                <button  onClick={toggleMessages}>Messages</button>
            </div>
            {matchesOrMessages === "matches" ? 
                <Matches  matches={currentUser.matches} currentUser={currentUser}/>
            :
                <ConversationsContainer currentUser={currentUser}/>
            }
        </div>
    );
}

export default Sidebar;