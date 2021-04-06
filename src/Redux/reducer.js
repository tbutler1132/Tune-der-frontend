import {combineReducers} from 'redux'

const defaultState = {
    users: []
}

function usersReducer(currentState = defaultState.users, action){
    switch(action.type){
        case "add_users_from_fetch":
            return action.payload
        default:
            return currentState
    }
}

const rootReducer = combineReducers({
    users: usersReducer
})

export default rootReducer