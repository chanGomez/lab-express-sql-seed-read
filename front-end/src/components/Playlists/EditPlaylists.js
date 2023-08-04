import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
let url = process.env.REACT_APP_API_URL;


function EditPlaylists() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
  
    const [playlist, setPlaylist] = useState({
      title: "",
    });
  
    useEffect(() => {
      const fetchsong = async () => {
        try {
          const response = await axios.get(`${url}/playLists/${id}`);
  
          setPlaylist(response.data);
          console.log(response.data);
        } catch (error) {
          navigate("/404");
        }
      };
  
      fetchsong();
    }, []);
  
    const handleTextChange = (e) => {
        setPlaylist({
        ...playlist,
        [e.target.id]: e.target.value,
      });
    };
  
    const updatesong = async (id) => {
      try {
        await axios.put(`${url}/playlists/${id}`, playlist);
      } catch (e) {
        console.log(e);
      }
    };
  
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        await updatesong(id);
        navigate(`/playlists/${id}`);
      } catch (e) {
        console.log(e);
      }
    }
  
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>title</label>
            <input
            className="form-control"
              required
              type="text"
              name="title"
              id="title"
              onChange={handleTextChange}
              value={playlist.title}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
}

export default EditPlaylists