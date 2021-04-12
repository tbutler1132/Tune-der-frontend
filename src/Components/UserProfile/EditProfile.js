import React, {useState} from 'react';
import {TextField, Button, Select, MenuItem} from '@material-ui/core'
import {connect} from 'react-redux'
import { editUser } from '../../Redux/actions';

import UploadDemos from './UploadDemos'

function EditProfile(props) {
    const [artistName, setArtistName] = useState('')
    const [bio, setBio] = useState('')
    // const [genre, setGenre] = useState('')
    const [tags, setTags] = useState([])
    const [role, setRole] = useState(props.currentUser.role)
    const [location, setLocation] = useState('')

    const artistNameHandler = (e) => {
        setArtistName(e.target.value)
    }

    const locationHandler = (e) => {
        setLocation(e.target.value)
    }

    const bioHandler = (e) => {
        setBio(e.target.value)
    }

    const tagsHandler = (e) => {
        setTags(e.target.value)
    }

    // const genreHandler = (e) => {
    //     setGenre(e.target.value)
    // }
    

    const handleChange = (e) => {
        setRole(e.target.value);
    };


    const submitEditProfileForm = (e) => {
        e.preventDefault()

        const options = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ 
                artist_name: artistName,
                bio: bio,
                role: role,
                location: location
            })
        }
        fetch(`http://localhost:3000/users/${props.currentUser.id}`, options)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            props.editUser(data)
            props.history.push('/app/profile')
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }

    return (
        <div>
        <div className="profile">
            <p>Edit Profile</p>
            <img id="profile-profile-pic" src="https://pbs.twimg.com/profile_images/485706215016505344/Du9c94_W_400x400.jpeg" alt="" height="150px" />
            <div className="upload-new-demo">
                <UploadDemos currentUser={props.currentUser}/>
            </div>
            <div>
                <form onSubmit={submitEditProfileForm} className="edit-profile-textfields">
                    {/* <InputLabel>Role</InputLabel> */}
                    <Select value={role} variant="outlined" onChange={handleChange} variant="outlined">
                        <MenuItem value={"Artist"}>Artist</MenuItem>
                        <MenuItem value={"Producer"}>Producer</MenuItem>
                        <MenuItem value={"Artist/Producer"}>Artist/Producer</MenuItem>
                    </Select>
                    <TextField onChange={artistNameHandler} value={artistName} label="Artist Name" variant="outlined"/>
                    <TextField onChange={locationHandler} value={location} label="Location" variant="outlined"/>
                    {/* <TextField onChange={genreHandler} value={genre} label="Genre" variant="outlined"/> */}
                    <TextField onChange={bioHandler} value={bio} label="Bio" variant="outlined"/>
                    <TextField onChange={tagsHandler} value={tags} label="Tags" variant="outlined"/>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (userObj) => dispatch({type: "edit_profile", payload: userObj}),
    }
}

export default connect(null, mapDispatchToProps)(EditProfile);