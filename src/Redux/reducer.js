import {combineReducers} from 'redux'

const defaultState = {
    otherUsers: [],
    currentUser: false,
    conversations: []
}

function otherUsersReducer(currentState = defaultState.otherUsers, action){
    switch(action.type){
        case "add_other_users_from_fetch":
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
            const newCurrentUserObj3 = {...currentState}
        default:
            return currentState
    }
}

function conversationsReducer(currentState = defaultState.conversations, action){
    switch(action.type){
        case "add_conversations":
            console.log(action)
            return action.payload
        default:
            return currentState
    }
}

const rootReducer = combineReducers({
    otherUsers: otherUsersReducer,
    currentUser: currentUserReducer,
    conversations: conversationsReducer
})

export default rootReducer