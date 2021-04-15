
//Fetch users from which to display potential matches
export const getUsers = (currentUserObj) => {
    return function(dispatch){
        fetch(`http://localhost:3000/users`)
        .then(r => r.json())
        .then(data => 
            {   data.currentUser = currentUserObj
                dispatch({type: "add_other_users_from_fetch", payload: data})
            }
        )
    }
}

export const addCurrentUser = (userObj) => {
    return function (dispatch){
        dispatch({type: "add_current_user", payload: userObj})
    }
}

export const addNewLike = (likeObj) => {
    return function (dispatch){
        dispatch({type: "add_like", payload: likeObj})
    }
}

export const addNewMatch = (matchObj) => {
    return function (dispatch){
        dispatch({type: "add_match", payload: matchObj})
    }
}

export const addNewConversation = (convoObj) => {
    return function (dispatch){
        dispatch({type: "add_convo", payload: convoObj})
    }
}

export const editUser = (userObj) => {
    console.log(userObj)
    return function (dispatch){
        dispatch({type: "edit_profile", payload: userObj})
    }
}

export const addMessage = (messageObj) => {
    console.log(messageObj)
    return function (dispatch){
        dispatch({type: "add_message", payload: messageObj})
    }
}

export const replaceFavoriteSong = (songObj) => {
    return function (dispatch){
        dispatch({type: "add_favorite_song", payload: songObj})
    }
}

export const addNewDemo = (demoObj) => {
    return function (dispatch){
        dispatch({type: "add_demo", payload: demoObj})
    }
}

