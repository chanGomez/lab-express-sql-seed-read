import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import PlaylistSongs from "../Playlist-songs/PlaylistSongs";


function Playlist() {
    const { id } = useParams();
  
    const [data, setData] = useState(null);
  
    let navigate = useNavigate()
  
    let url = process.env.REACT_APP_API_URL;
  
    useEffect(() => {
      fetchData();
    }, []);
  
    async function fetchData() {
      try {
        let result = await axios.get(`${url}/playlists/${id}`);
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    const handleDeleteById = async () => {
      try {
        const response = await axios.delete(`${url}/playlists/${id}`);
        console.log(response);
        const { title } = response.data;
        alert(`Song ${title} has been deleted`);
        navigate("/playlists");
      } catch (error) {
        console.log(error);
      }
    };

    return (
        <div>
          <div>
            <h2> {data?.title}</h2>
          </div>

          <PlaylistSongs/>
          
          <div className="log-container-navigation">
            <span><button onClick={() => navigate("/playlists")}>Back</button></span>
            <span><Link to={`/playlists/${id}/edit`}>{" "}<button>Edit</button></Link></span>
            <span><button onClick={() => handleDeleteById()}>Delete</button></span>


            {/* <ul>
              <li>
              <button onClick={() => navigate("/songs")}>Back</button>
              </li>
              <li>
              <Link to={`/songs/${id}/edit`}>
                {" "}
                <button>Edit</button>
              </Link>
              </li>
              <li>
                <button onClick={() => handleDeleteById()}>Delete</button>
              </li>
            </ul> */}
          </div>
        </div>
      );
}

export default Playlist