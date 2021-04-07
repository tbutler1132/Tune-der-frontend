import {combineReducers} from 'redux'

const defaultState = {
    users: [],
    currentUser: false
}

function usersReducer(currentState = defaultState.users, action){
    switch(action.type){
        case "add_users_from_fetch":
            return action.payload
        default:
            return currentState
    }
}

function currentUserReducer(currentState = defaultState.currentUser, action){
    switch(action.type){
        case "add_current_user":
            return action.payload
        default:
            return currentState
    }
}


const rootReducer = combineReducers({
    users: usersReducer,
    currentUser: currentUserReducer
})

export default rootReducer