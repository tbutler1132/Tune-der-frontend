import React, {useEffect, useState} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ReactAudioPlayer from 'react-audio-player'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LocationOnIcon from '@material-ui/icons/LocationOn';
// import MusicNoteIcon from '@material-ui/icons/MusicNote';


function Profile(props) {
    const [expanded, expandProfile] = useState(false)

    //Create state that represents 3 demos, 3 integers each correspond to 1 demo which will be displayed while state is equal to its respective integer
    const [demoDisplay, changeDisplayedDemo] = useState(0)

    console.log(props.user.demos)

    useEffect(() => {
        
    })

    const demoDisplayIncrement = () => {
        changeDisplayedDemo(demoDisplay + 1)
    }

    const demoDisplayDecrement = () => {
        changeDisplayedDemo(demoDisplay - 1)
    }

    //render tags
    const renderTags = () => {
        return props.user.tags.map((tag, i) => <p key={i}>#{tag}</p>)
    }

    //Variables
    const audioSource = `http://localhost:3000/${props.user.demos[demoDisplay].audio_data?.url}`

    return (
        <div className="profile">
            {expanded ?
                <> 

                <img id="profile-profile-pic" src={`http://localhost:3000/${props.user.avatar?.url}`} alt="Profile" height="150px" />

                {/* <p>{props.user.demos[demoDisplay].title}</p> */}
                <div className="demo-audio">
                    {demoDisplay !== 0 ? <ChevronLeftIcon onClick={demoDisplayDecrement}/> : null}
                        <ReactAudioPlayer
                            src={audioSource}
                            controls={true}
                            playing={true}
                        />
                    {demoDisplay !== props.user.demos.length - 1 ? <ChevronRightIcon onClick={demoDisplayIncrement}/> : null}
                </div>
                <h1 className="profile-section">{props.user.name}</h1>
                {/* <MusicNoteIcon />  */}
                <h3 className="profile-section">{props.user.role}</h3>
                <p className="profile-section">{props.user.bio}</p>
                <div className="profile-location">
                    <LocationOnIcon /> 
                    <h3>{props.user.location}</h3>
                </div>
                <div className="edit-anthem">
                    <img src={`${props.user.favorite_track?.image}`} alt="" width="50px" height="50px"/>
                    <p>{props.user.favorite_track?.artist} - {props.user.favorite_track?.name} </p>
                </div>
                <ReactAudioPlayer 
                    src={props.user.favorite_track?.preview}
                    controls={true}
                />
                <div className="tags">
                    {renderTags()}
                </div>

                <ExpandLessIcon onClick={() => expandProfile(false)}/>

                </>
            :
                <> 
                <img src={`http://localhost:3000/${props.user.avatar?.url}`} alt="Profile" height="150px" />

                {/* <p>{props.user.demos[demoDisplay].title}</p> */}
                <div className="demo-audio">
                    {demoDisplay !== 0 ? <ChevronLeftIcon onClick={demoDisplayDecrement}/> : null}
                        <ReactAudioPlayer
                            src={audioSource}
                            controls={true}
                            playing={true}
                        />
                    {demoDisplay !== props.user.demos.length - 1 ? <ChevronRightIcon onClick={demoDisplayIncrement}/> : null}
                </div>

                <h1>{props.user.name}</h1>
                <h3>{props.user.role}</h3>
                <div className="profile-location">
                    <LocationOnIcon /> 
                    <h3>{props.user.location}</h3>
                </div>

                <ExpandMoreIcon onClick={() => expandProfile(true)}/>
                </>
            }
        </div>
    );
}

export default Profile;