import React, {useState} from 'react';
import ReactModal from 'react-modal'
import {DirectUpload} from 'activestorage'
import {TextField} from '@material-ui/core'
import {connect} from 'react-redux'

function UploadDemos(props) {
    const [demoTitle, setDemoTitle] = useState('')
    const [demo, setDemo] = useState({})

    const demoTitleHandler = (e) => {
        setDemoTitle(e.target.value);
    }

    const uploadForm = () => {
       return ( 
            <div className="upload-demo-form">
                <form onSubmit={submitNewDemo}>
                    <TextField onChange={demoTitleHandler} value={demoTitle} label="title" variant="outlined"/>
                    <input type="file" name="demo" onChange={changeHandler}/>
                    <button>Upload</button>
                </form>
            </div>
       )
    }

    const changeHandler = (e) => {
        console.log(e.target.files[0])
        if (e.target.name === 'demo'){
            setDemo({ [e.target.name]: e.target.files[0] })  
        } else {
            setDemo({ [e.target.name]: e.target.value })
        }
    }

    console.log(demo.demo)

    const demoDisplay = (order) => {
       return <p>{props.currentUser.demos[order].title}</p>
    }

    const submitNewDemo = (e) => {
        e.preventDefault()
        const newDemo = {
            user_id: props.currentUser.id,
            title: demoTitle
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify( newDemo )
        }
        fetch("http://localhost:3000/demos", options)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            uploadFile(demo.demo, data)
        })
    }

    const uploadFile = (file, demo) => {
        console.log(demo)
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {

                fetch(`http://localhost:3000/demos/${demo.id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                  },
                body: JSON.stringify({audio_data: blob.signed_id})
                })
                .then(r => r.json())
                .then(data => {
                    console.log(data)
                    const demo = data.demo
                    demo.audio_data = {}
                    demo.audio_data.url = data.audio_data_url
                    console.log(demo)
                    props.addDemo(demo)
                })

            }
        })
    } 

    return (
        <div className="profile">
            <p>Upload Demos</p>
  
            <div className="demo-display">
                {props.currentUser.demos[0] ? 
                    demoDisplay(0)
                :
                    uploadForm()
                }

                {props.currentUser.demos[1] ? 
                    demoDisplay(1)
                :
                    uploadForm()
                }

                {props.currentUser.demos[2] ? 
                    demoDisplay(2)
                :
                    uploadForm()
                }
            </div>
                
    
        </div>
    );
}

const mdp = (dispatch) => {
    return {
        addDemo: (demoObj) => dispatch({type: "add_demo", payload: demoObj}),
    }
}

export default connect(null, mdp)(UploadDemos);