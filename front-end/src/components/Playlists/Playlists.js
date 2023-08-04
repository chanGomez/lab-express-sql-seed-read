import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Playlists() {
    const [playlistsArray, setPlaylistsArray] = useState([])

    let url = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchData()
    }, [])
    
    async function fetchData(){
        try {
            let result = await axios.get(`${url}/playlists`)
            setPlaylistsArray(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    function showData(){
        return(
            <ul className="list-group">
            {playlistsArray.map(({id, title}) =>{
                return(
                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                    <Link to={`/playlists/${id}`}>
                    {`${title}`} 
                    </Link>
                    </li>
                )
            })}
            </ul>
        )
    }
    return (
        <div className='container'>
                    <div>
                {playlistsArray.length === 0 ? <p> No songs. Please make some songs! </p> : showData() }
            </div>
        </div>
      )
}

export default Playlists