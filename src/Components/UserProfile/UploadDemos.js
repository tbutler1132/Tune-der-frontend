import React, {useState} from 'react';
import ReactModal from 'react-modal'

function UploadDemos(props) {
    const [modalOpen, setModalOpen] = useState()

    return (
        <div>
            <p onClick={() => setModalOpen(true)}>Upload Demos</p>
            <ReactModal 
            ariaHideApp={false} 
            isOpen={modalOpen}>
                <p>{props.currentUser.demos[0].title}</p>
                <p>{props.currentUser.demos[1]?.title}</p>
                <p>{props.currentUser.demos[2]?.title}</p>
            </ReactModal>
        </div>
    );
}

export default UploadDemos;