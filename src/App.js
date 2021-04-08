import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {useEffect} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'

import RecsContainer from './Components/Recs/RecsContainer'
import UserProfileContainer from './Components/UserProfile/UserProfileContainer'
import Login from './Components/Login'
import SignUp from './Components/SignUp'



function App(props) {

//Desctructure Props
const {history, currentUser, setCurrentUser} = props


  //Check if user has been authenticated 

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
      history.push('/app/recs')
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
          <Route path="/app/recs" render={() =><RecsContainer />}/>
          <Route path="/app/profile" render={() =><UserProfileContainer currentUser={currentUser}/>}/>
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
