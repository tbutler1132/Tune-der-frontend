import React, {useState, useEffect} from 'react';
import {TextField, Button} from '@material-ui/core'
import {Redirect, withRouter} from 'react-router-dom'

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // useEffect(() => {
    //     if (props.currentUser){

    //     }
    // })

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.loginHandler({email: email, password: password})
    }

    const redirectToSignUp = () => {
        props.history.push("/signup")
    }

    return (
        props.currentUser ? 
            <Redirect to="/app/recs"/> 
        : 
            <div className="login">
                <form onSubmit={submitHandler}>
                    <TextField value={email} onChange={emailHandler} label="email" variant="outlined"/>
                    <TextField value={password} onChange={passwordHandler} label="password" variant="outlined"/>
                    <Button type="submit">Submit</Button>
                </form>
                <p onClick={redirectToSignUp}>Not a user? Well sign up then!</p>
            </div>
    
    );
}

export default withRouter(Login);