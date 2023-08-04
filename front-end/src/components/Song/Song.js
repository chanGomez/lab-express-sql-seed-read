import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Song() {
  const { id } = useParams();
  
  const [data, setData] = useState(null);

  let navigate = useNavigate()

  let url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let result = await axios.get(`${url}/songs/${id}`);
      setData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteById = async () => {
    try {
      const response = await axios.delete(`${url}/songs/${id}`);
      console.log(response);
      const { name } = response.data;
      alert(`Song ${name} has been deleted`);
      navigate("/songs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2> Song Details</h2>
        </div>
        <p>Title: {data?.name}</p>
        <p>Artist :{data?.artist}</p>
        <p> Album: {data?.album}</p>
        <p> Time : {data?.time}</p>
        <p>Favorite : {data?.is_favorite ? "✅" : "❌"}</p>
      </div>
      <div className="log-container-navigation">
        <ul>
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
        </ul>
      </div>
    </div>
  );
}

export default Song;
