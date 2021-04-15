import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core'
import {connect} from 'react-redux'
import { addMessage } from '../../Redux/actions';

function MessageForm(props) {
    const [messageContent, setMessageContent] = useState('')

    const messageHandler = (e) => {
        setMessageContent(e.target.value)
    }

    const addMessageToDataBase = () => {
        console.log("clicky")
        const newMessage = {
            content: messageContent,
            user_id: props.currentUser.id,
            conversation_id: props.convoObj.id,
        }

        console.log(newMessage)

        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ message: newMessage })
        }

        fetch("http://localhost:3000/messages", options)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            props.addMessage(data)
        })
        .catch(error => {
            console.log('Error:', error);
        });

        setMessageContent("")
    }

    return (
        <div>
            <TextField onChange={messageHandler} value={messageContent} label="message" variant="outlined"/>
            <Button onClick={addMessageToDataBase}>Send</Button>
        </div>
    );
}

const mdp = (dispatch) => {
    return {
        addMessage: (messageObj) => dispatch({type: "add_message", payload: messageObj}),
    }
}

export default connect(null, mdp)(MessageForm);