import React from 'react';
import {connect} from 'react-redux'

function SongResult(props) {
    const addNewFavoriteSong = () => {
        
        const newFavoriteSong = {
            name: props.songObj.name,
            artist: props.songObj.artist,
            spotify_id: props.songObj.spotify_id,
            image: props.songObj.image,
            user_id: props.currentUser.id
        }

        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ favorite_track: newFavoriteSong })
        }

        fetch("http://localhost:3000/favorite_tracks", options)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            props.replaceFavoriteSong(data)
            props.history.push('/app/profile')
        })
        .catch(error => {
            console.log('Error:', error);
        }); 
    }

    return (
        <div className="spotify-search-result">
            <img src={`${props.songObj.image}`} alt="" width="50px" height="50px"/>
            <p onClick={addNewFavoriteSong}>{props.songObj.artist} - {props.songObj.name}</p>
        </div>
    )
}


const mdp = (dispatch) => {
    return {
        replaceFavoriteSong: (songObj) => dispatch({type: "add_favorite_song", payload: songObj}),
    }
}

export default connect(null, mdp)(SongResult);