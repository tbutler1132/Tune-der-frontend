import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import {TextField, Button, Select, InputLabel, MenuItem} from '@material-ui/core'

function SignUp(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('')

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const firstNameHandler = (e) => {
        setFirstName(e.target.value)
    }

    const lastNameHandler = (e) => {
        setLastName(e.target.value)
    }

    const handleChange = (e) => {
        setRole(e.target.value);
    };

    const signUpHandler = (e) => {
        e.preventDefault()
        props.signUpHandler({email: email, password: password, name: `${firstName} ${lastName}`, role: role})
    }

    return (
        <div>
            {props.currentUser ?
            <Redirect to="/app/recs"/>
            :
            <form onSubmit={signUpHandler}>
                <TextField onChange={emailHandler} value={email} label="email" variant="outlined"/>
                <TextField onChange={passwordHandler} value={password} label="password" variant="outlined"/>
                <TextField onChange={firstNameHandler} value={firstName} label="First Name" variant="outlined"/>
                <TextField onChange={lastNameHandler} value={lastName} label="Last Name" variant="outlined"/>
                <InputLabel>Role</InputLabel>
                <Select value={role} variant="outlined" onChange={handleChange}>
                    <MenuItem value={"Artist"}>Artist</MenuItem>
                    <MenuItem value={"Producer"}>Producer</MenuItem>
                    <MenuItem value={"Both"}>Both</MenuItem>
                </Select>
                <Button type="submit">Submit</Button>
            </form>
            }
        </div>
    );
}

export default SignUp;