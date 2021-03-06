import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {useEffect} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'

import RecsContainer from './Components/Recs/RecsContainer'
import UserProfileContainer from './Components/UserProfile/UserProfileContainer'
import MatchContainer from './Components/Matches/MatchContainer'
import Login from './Components/Login'
import SignUp from './Components/SignUp'


function App(props) {

//Desctructure Props
const {history, currentUser, setCurrentUser} = props


//Check if user has been authenticated 
//If they are, dispatch currenUserObj to redux

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      fetch(`http://localhost:3000/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(r => r.json())
        .then(data => {
          setCurrentUser(data.user);
      })
      .catch(error => console.log(error))
    } else {
      history.push('/login')
    }
  }, [history, setCurrentUser]);

  //Allow user to login
  //If successful, get profile and dispatch currentUserObj to Redux

  const loginHandler = (userInfo) => {
    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user: userInfo})
    })
    .then(r => r.json())
    .then(data => {
      setCurrentUser(data.user)
      localStorage.setItem("token", data.jwt)
      history.push(`/app/recs`)
    })
    .catch(error => console.log(error))
  }

  //Allow user to sign up
  //If successful, set currentUserObj and push them to edit so they can finish filling out their profile

  const signUpHandler = (userObj) => {
    fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user: userObj})
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      setCurrentUser(data.user)
      localStorage.setItem("token", data.jwt)
      history.push('/app/profile/edit')
    })
    .catch(error => console.log(error))
  }
  
  return (
    <div className="App">
      {!currentUser ? 
        <Switch>
          <Route path="/login" render={() => <Login currentUser={currentUser} loginHandler={loginHandler} />}/>
          <Route path="/signup" render={() => <SignUp signUpHandler={signUpHandler} currentUser={currentUser}/>}/>
        </Switch>
      :
        <Switch>
          <Route exact path="/"><Redirect to="app/recs"/></Route>
          <Route path="/app/recs" render={() =><RecsContainer history={history} />}/>
          <Route path="/app/profile" render={() =><UserProfileContainer history={history} currentUser={currentUser}/>}/>
          <Route path="/match/:id" render={({match}) => {
              const id = parseInt(match.params.id) 
              return <MatchContainer history={history} id={id} currentUser={currentUser}/>
          }}/>
        </Switch>

      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {currentUser: state.currentUser}
}

const mapDispatchToProps = (dispatch) => {
  return {setCurrentUser: (userObj) => dispatch({type: "add_current_user", payload: userObj})}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter)
  (App);
