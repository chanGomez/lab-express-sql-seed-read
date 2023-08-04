import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Songs() {
    const [songsArray, setSongsArray] = useState([])

    let url = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchData()
    }, [])
    
    async function fetchData(){
        try {
            let result = await axios.get(`${url}/songs`)
            setSongsArray(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    function showData(){
        return(
            <ul className="list-group">
            {songsArray.map(({id, name, artist, album, time, is_favorite}) =>{
                return(
                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                    <Link to={`/songs/${id}`}>
                    <span className="badge badge-primary badge-pill">{`${is_favorite ? "✅" : "❌"}`}</span>
                    {` - ${name} - ${artist} - ${time}`} 
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
            {songsArray.length === 0 ? <p> No songs. Please make some songs! </p> : showData() }
        </div>
    </div>
  )
}

export default Songs