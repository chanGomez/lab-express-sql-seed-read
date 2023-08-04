import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
let url = process.env.REACT_APP_API_URL;

function EditSong() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    time: "",
    is_favorite: false,
  });

  useEffect(() => {
    const fetchsong = async () => {
      try {
        const response = await axios.get(`${url}/songs/${id}`);

        setSong(response.data);
        console.log(response.data);
      } catch (error) {
        navigate("/404");
      }
    };

    fetchsong();
  }, []);

  const handleTextChange = (e) => {
    setSong({
      ...song,
      [e.target.id]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setSong({
      ...song,
      is_favorite: !song.is_favorite,
    });
  };

  const updatesong = async (id) => {
    try {
      await axios.put(`${url}/songs/${id}`, song);
    } catch (e) {
      console.log(e);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updatesong(id);
      navigate(`/songs/${id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>name</label>
          <input
          className="form-control"
            required
            type="text"
            name="name"
            id="name"
            onChange={handleTextChange}
            value={song.name}
          />
        </div>
        <div className="form-group">
          <label>Artist</label>
          <input
          className="form-control"
            required
            type="text"
            name="artist"
            id="artist"
            onChange={handleTextChange}
            value={song.artist}
          />
        </div>
        <div className="form-group">
          <label>Album</label>
          <input
          className="form-control"
            required
            type="text"
            name="album"
            id="album"
            onChange={handleTextChange}
            value={song.album}
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
          className="form-control"
            required
            type="text"
            name="time"
            id="time"
            onChange={handleTextChange}
            value={song.time}
          />
        </div>
        <div className="form-group">
          <label>Favorite</label>
          <input
          className="form-control"
            type="checkbox"
            name="is_favorite"
            id="is_favorite"
            onChange={handleCheckboxChange}
            checked={song.is_favorite}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditSong;