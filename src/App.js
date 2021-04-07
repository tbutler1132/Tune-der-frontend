import './App.css';
import {Route, Switch} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {useState, useEffect} from 'react'

import RecsContainer from './Components/Recs/RecsContainer'
import UserProfileContainer from './Components/UserProfile/UserProfileContainer'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import ProfileHeader from './Components/ProfileHeader'
import Profile from './Components/Profile/Profile';

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState(false)

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
          setLoggedInUser(data.user);
      })
      .catch(error => console.log(error))
    } else {
      props.history.push('/login')
    }
  }, [props.history]);

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
      console.log(data.user)
      setLoggedInUser(data.user)
      localStorage.setItem("token", data.jwt)
      props.history.push(`/app/recs`)
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
      setLoggedInUser(data.user)
      localStorage.setItem("token", data.jwt)
      props.history.push('/app/recs')
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <ProfileHeader />
      <Switch>
        <Route path="/login" render={() => <Login currentUser={loggedInUser} loginHandler={loginHandler} />}/>
        <Route path="/signup" render={() => <SignUp signUpHandler={signUpHandler} currentUser={loggedInUser}/>}/>
        <Route path="/app/recs" render={() =><RecsContainer currentUser={loggedInUser}/>}/>
        <Route path="/app/profile" render={() =><UserProfileContainer currentUser={loggedInUser}/>}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
