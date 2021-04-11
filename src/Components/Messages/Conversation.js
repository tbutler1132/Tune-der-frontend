import React, {useState} from 'react';
import ReplyIcon from '@material-ui/icons/Reply';

function Conversation(props) {

    const [convoOpen, openConvo] = useState(false)

    const renderMessages = () => {
        return props.convoObj.messages.map(message => 
            <div className="message"> 
            <p key={message.id}>
                {message.user_id === props.currentUser.id ? props.currentUser.name : props.match.name}: {message.content}
            </p>
            </div>
        )
    }

    const clickHandler = () => {
        !convoOpen ? openConvo(true) : openConvo(false)
    }

    return (
        <div className="conversation">
            <h4 onClick={clickHandler}>{props.match.name}</h4>
            {!convoOpen ?
            renderMessages()[renderMessages().length - 1]
            :
            <>
            {renderMessages()}
            <input></input>
            </>
            }
        </div>
    );
}

export default Conversation;