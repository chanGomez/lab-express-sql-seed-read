import axios from 'axios'
import React, { useState} from 'react'
import {useNavigate} from "react-router-dom";

function NewPlaylist() {
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState({
      name: "",
    });
  
    async function handleSubmit(e) {
      e.preventDefault();

      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/playlists`, playlist);
        alert("New playlist Created");
        navigate(`/playlists`);
      } catch (error) {
        console.log(error);
      }
    }
    function handleOnChange(id, value) {
    setPlaylist({ ...playlist, [id]: value });
    }
  
    return (
      <div className='container'>
        <h1>New playlist</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
            className="form-control"
              type="text"
              id="name"
              required
              onChange={(e) => {
                handleOnChange(e.target.id, e.target.value);
              }}
            />
          </div>
          {/* <div className="mb-3">
            <label className="form-label">Artist</label>
            <input
            className="form-control"
              type="text"
              id="artist"
              onChange={(e) => {
                handleOnChange(e.target.id, e.target.value);
              }}
            />
          </div> */}
          <button type="submit">
            Create Playlist
          </button>
        </form>
        <br />
        <button onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
}

export default NewPlaylist