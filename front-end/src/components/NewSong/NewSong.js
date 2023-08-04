import axios from 'axios'
import React, { useState} from 'react'
import {useNavigate} from "react-router-dom";

function NewSong() {
    const navigate = useNavigate();
    const [song, setSong] = useState({
      name: "",
      artist: "",
      album: "",
      time:"",
      is_favorite: false,
    });
  
    async function handleSubmit(e) {
      e.preventDefault();

      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/songs`, song);
        alert("New song Created");
        navigate(`/songs`);
      } catch (error) {
        console.log(error);
      }
    }
    function handleOnChange(id, value) {
      setSong({ ...song, [id]: value });
    }
  
    return (
      <div className='container'>
        <h1>New song</h1>
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
          <div className="mb-3">
            <label className="form-label">Artist</label>
            <input
            className="form-control"
              type="text"
              id="artist"
              required
              onChange={(e) => {
                handleOnChange(e.target.id, e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Album</label>
            <input
            className="form-control"
              type="text"
              id="album"
              required
              onChange={(e) => {
                handleOnChange(e.target.id, e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              className="form-control"
              type="text"
              id="time"
              required
              onChange={(e) => {
                handleOnChange(e.target.id, e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-check-labelk">Favorite</label>
            <input
              // className="form-check-input"
              type="checkbox"
              id="is_favorite"
              onChange={(e) => {
                handleOnChange(e.target.id, e.target.checked);
              }}
            />
          </div>
          <button type="submit">
            Create Song
          </button>
        </form>
        <br />
        <button onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  export default NewSong;