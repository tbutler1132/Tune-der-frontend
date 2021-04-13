import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import { addConversations } from '../../Redux/actions';

import Conversation from './Conversation'


function ConversationsContainer(props) {

    useEffect(() => {
        addConversations(props.currentUser.initiated_conversations, props.currentUser.received_conversations)
    })
    
//Organize and Render ConversationsContainer
    const convos = props.currentUser.initiated_conversations.concat(props.currentUser.received_conversations)

    const renderConvos = () => {
        return convos.map(convo => 
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

const mapStateToProps = (state) => {
    return {
        conversations: state.conversations,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {addConversations: (iConvoArr, rConvoArr) => dispatch({type: "add_conversations", payload: iConvoArr, rConvoArr})}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsContainer);