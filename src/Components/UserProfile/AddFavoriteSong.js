import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core'
import {connect} from 'react-redux'

import SongResult from './SongResult'

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
        return searchResults.map(result => <SongResult history={props.history} addFavoriteSong={props.addFavoriteSong} currentUser={props.currentUser} key={result.spotify_id} songObj={result} />)
    }



    return (
        <div className="profile">
            <form onSubmit={searchSpotify} className="search-spotify-form">
                <TextField onChange={searchQueryHandler} value={searchQuery} label="Search" variant="outlined"/> 
                <Button type="submit">Search</Button>
            </form>
            {renderResults()}
        </div>
    );
}

export default AddFavoriteSong;

//Helper Component? lol

