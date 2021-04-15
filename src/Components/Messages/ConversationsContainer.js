import React, {useEffect} from 'react';

import Conversation from './Conversation'


function ConversationsContainer(props) {
    
//Organize and Render ConversationsContainer
    // const convos = props.currentUser.initiated_conversations.concat(props.currentUser.received_conversations)

    const renderConvos = () => {
        return props.currentUser.conversations.map(convo => 
            convo.sender.id === props.currentUser.id ? 
                <Conversation key={convo.id} currentUser={props.currentUser} convoObj={convo} match={convo.reciever} />
            :
                <Conversation key={convo.id} currentUser={props.currentUser} convoObj={convo} match={convo.sender} />
        )
    }

    return (
        <div className="message-container">
            <h3>Convos</h3>
            {renderConvos()}
        </div>
    );
}


export default ConversationsContainer;