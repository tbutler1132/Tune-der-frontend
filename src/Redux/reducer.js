import {combineReducers} from 'redux'

const defaultState = {
    otherUsers: [],
    currentUser: false
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
        case "add_like":
            const newLikeObj = {...currentState}
            newLikeObj.liked.push(action.payload.liked)
            return newLikeObj
        default:
            return currentState
    }
}

const rootReducer = combineReducers({
    otherUsers: otherUsersReducer,
    currentUser: currentUserReducer
})

export default rootReducer