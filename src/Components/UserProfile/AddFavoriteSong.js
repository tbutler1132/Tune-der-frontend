import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core'

function AddFavoriteSong(props) {

    const [searchQuery, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const searchQueryHandler = (e) => {
        setQuery(e.target.value)
    }

    //Destroy favorite song on search

    const searchSpotify = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/tracks/search?q=${searchQuery}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setSearchResults(data)
        })
        console.log(props.currentUser.favorite_track)
        if (props.currentUser.favorite_track){
            const options = {
                method: "DELETE"
            }
            
            fetch(`http://localhost:3000/favorite_tracks/${props.currentUser.favorite_track.id}`, options)
            .then(response => response.json())
            .then(data => {
                    console.log(data)
            })
        }
        
    }


    const renderResults = () => {
        return searchResults.map(result => <SongResult currentUser={props.currentUser} key={result.spotify_id} songObj={result} />)
    }



    return (
        <div className="profile">
            <form onSubmit={searchSpotify}>
                <TextField onChange={searchQueryHandler} value={searchQuery} label="Search" variant="outlined"/> 
                <Button type="submit">Search</Button>
            </form>
            {renderResults()}
        </div>
    );
}

export default AddFavoriteSong;

//Helper Component? lol

function SongResult (props) {

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
        })
        .catch(error => {
            console.log('Error:', error);
        }); 
    }

    return (
        <div>
            <p onClick={addNewFavoriteSong}>{props.songObj.artist}: {props.songObj.name}</p>
        </div>
    )
    
}