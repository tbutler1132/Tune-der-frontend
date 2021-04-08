import React from 'react';
import {TextField, Button, Select, InputLabel, MenuItem} from '@material-ui/core'

function EditProfile(props) {
    return (
        <div className="profile">
            <p >Edit Profile</p>
            <img id="profile-profile-pic" src="https://pbs.twimg.com/profile_images/485706215016505344/Du9c94_W_400x400.jpeg" alt="" height="150px" />
            <div className="upload-new-demo">
                <p>1</p>
                <p>2</p>
                <p>3</p>
            </div>
            <div>
                <form className="edit-profile-textfields">
                    <InputLabel>Role</InputLabel>
                    <Select variant="outlined">
                        <MenuItem value={"Artist"}>Artist</MenuItem>
                        <MenuItem value={"Producer"}>Producer</MenuItem>
                        <MenuItem value={"Both"}>Both</MenuItem>
                    </Select>
                    <TextField label="Name" variant="outlined"/>
                    <TextField label="Location" variant="outlined"/>
                    <TextField label="Bio" variant="outlined"/>
                    <TextField label="Tags" variant="outlined"/>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;