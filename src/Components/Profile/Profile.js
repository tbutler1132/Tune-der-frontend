import React, {useState} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ReactAudioPlayer from 'react-audio-player'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import MusicNoteIcon from '@material-ui/icons/MusicNote';
// import ReactHowler from 'react-howler'

function Profile(props) {
    const [expanded, expandProfile] = useState(false)

    //Create state that represents 3 demos, 3 integers each corrsepond to 1 demo which will be displayed while state is equal to its respective integer
    const [demoDisplay, changeDisplayedDemo] = useState(0)

    const demoDisplayIncrement = () => {
        changeDisplayedDemo(demoDisplay + 1)
    }

    const demoDisplayDecrement = () => {
        changeDisplayedDemo(demoDisplay - 1)
    }

    //Variables
    const audioSource = `http://localhost:3000/${props.user.demos[demoDisplay].audio_data.url}`

    //Render Methods

    return (
        <div className="profile">
            {expanded ?
                <> 

                <img src="https://pbs.twimg.com/profile_images/485706215016505344/Du9c94_W_400x400.jpeg" alt="2/3" height="150px" />

                {demoDisplay != 0 ? <ChevronLeftIcon onClick={demoDisplayDecrement}/> : null}
                <ReactAudioPlayer
                    src={audioSource}
                    controls={true}
                    playing={true}
                />
                {demoDisplay != props.user.demos.length ? <ChevronRightIcon onClick={demoDisplayIncrement}/> : null}

                <h1>{props.user.name}</h1>
                {/* <MusicNoteIcon />  */}
                <h3>{props.user.role}</h3>
                <h3>{props.user.location}</h3>
                <p>#{props.user.tags}</p>
                <h4>{props.user.bio}</h4>

                <ExpandLessIcon onClick={() => expandProfile(false)}/>

                </>
            :
                <> 
                <img src="https://pbs.twimg.com/profile_images/485706215016505344/Du9c94_W_400x400.jpeg" alt="" height="150px" />

                <ReactAudioPlayer
                    src={audioSource}
                    controls={true}
                />

                <h1>{props.user.name}</h1>
                <h3>{props.user.role}</h3>

                <ExpandMoreIcon onClick={() => expandProfile(true)}/>
                </>
            }
        </div>
    );
}

export default Profile;