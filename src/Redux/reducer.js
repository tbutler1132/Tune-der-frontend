import {combineReducers} from 'redux'

const defaultState = {
    otherUsers: [],
    currentUser: false,
}

function otherUsersReducer(currentState = defaultState.otherUsers, action){
    switch(action.type){
        case "add_other_users_from_fetch":
            console.log('Aw fuck Im firing')
            action.payload.splice(action.payload.indexOf(action.payload.find(user => user.id === action.payload.currentUser.id)), 1)
            delete action.payload.currentUser
            return action.payload
        default:
            return currentState
    }
}

function currentUserReducer(currentState = defaultState.currentUser, action){
    switch(action.type){

        case "add_current_user":
            const convos = action.payload.initiated_conversations.concat(action.payload.received_conversations)
            delete action.payload.initiated_conversations
            delete action.payload.received_conversations
            action.payload.conversations = convos
            return action.payload

        case "edit_profile":
            console.log(action.payload)
            return action.payload

        case "add_like":
            const newCurrentUserObj1 = {...currentState}
            newCurrentUserObj1.liked.push(action.payload.liked)
            return newCurrentUserObj1

        case "add_match":
            const newCurrentUserObj2 = {...currentState}
            newCurrentUserObj2.matches.push(action.payload.liked)
            return newCurrentUserObj2

        case "add_message":
            console.log(action.payload)
            const newCurrentUserObj3 = {...currentState}
            const convoIndex = newCurrentUserObj3.conversations.indexOf(newCurrentUserObj3.conversations.find(convo => convo.id === action.payload.conversation_id))
            newCurrentUserObj3.conversations[convoIndex].messages.push(action.payload)
            return newCurrentUserObj3

        case "add_convo":
            console.log(action.payload)
            const newCurrentUserObj4 = {...currentState}
            newCurrentUserObj4.conversations.push(action.payload)
            return newCurrentUserObj4

        case "add_favorite_song":
            console.log(action.payload)
            currentState.favorite_track = action.payload
            return currentState

        case "add_demo":
            console.log(action.payload)
            const newCurrentUserObj5 = {...currentState}
            newCurrentUserObj5.demos.push(action.payload)
            return newCurrentUserObj5
        default:
            return currentState
    }
}


const rootReducer = combineReducers({
    otherUsers: otherUsersReducer,
    currentUser: currentUserReducer,
})

export default rootReducer