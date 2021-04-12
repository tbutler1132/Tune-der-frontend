import React, {useState} from 'react';
import ReactModal from 'react-modal'
import {DirectUpload} from 'activestorage'

function UploadDemos(props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [demoTitle, setDemoTitle] = useState('')
    const [demo, setDemo] = useState({})

    const uploadForm = () => {
       return ( 
            <form onSubmit={submitNewDemo}>
                <input type="file" name="demo" onChange={changeHandler}/>
                <button>Upload</button>
            </form>
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

    const demoBlob = (order) => {
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
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_upload')
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
                .then(data => console.log(data))

            }
        })
    } 

    return (
        <div>
            <p onClick={() => setModalOpen(true)}>Upload Demos</p>
            <ReactModal 
            ariaHideApp={false} 
            isOpen={modalOpen}
            shouldCloseOnOverlayClick={true}
            className="demos-modal"
            // overlayClassName="demos-modal-overlay"
            >
            <div className="demo-display">
                {props.currentUser.demos[0] ? 
                    demoBlob(0)
                :
                    uploadForm()
                }

                {props.currentUser.demos[1] ? 
                    demoBlob(1)
                :
                    uploadForm()
                }

                {props.currentUser.demos[2] ? 
                    demoBlob(2)
                :
                    uploadForm()
                }
                {uploadForm()}
            </div>
                
            </ReactModal>
        </div>
    );
}

export default UploadDemos;