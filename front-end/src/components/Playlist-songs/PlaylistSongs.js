import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaylistSong from "./PlaylistSong";
import PlaylistSongForm from "./PlaylistSongForm";

function PlaylistSongs() {
  const API = process.env.REACT_APP_API_URL;

  const [songsInPlaylist, setSongsInPlaylist] = useState([]);

  const [songs, setSongs] = useState([]);
  //new song toggle
  const [viewNewSongToggleForm, setViewNewSongToggleForm] = useState(false);
  //edit song toggle
  const [viewEditToggleForm, setViewEditToggleForm] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    fetchSongsInPlaylist();
  }, [id, API]);

  async function fetchSongsInPlaylist() {
    try {
      let result = await axios.get(`${API}/playlists/${id}/songs-playlist`);

      setSongsInPlaylist(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd(newSong) {
    try {
      let result = await axios.post(
        `${API}/playlists/${id}/songs-playlist`,
        newSong
      );
      setSongsInPlaylist([result.data, ...songsInPlaylist]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(updatedSong) {
    console.log("Handle Edit", updatedSong);
    try {
      let result = await axios.put(
        `${API}/playlists/${id}/songs-playlist/${updatedSong.id}`,
        updatedSong
      );

      const copySongArray = [...songs];

      const indexUpdatedSong = copySongArray.findIndex((songs) => {
        return songs.id === updatedSong.id;
      });

      copySongArray[indexUpdatedSong] = result.data;

      setSongs(copySongArray);

      setViewEditToggleForm(!viewEditToggleForm);
    } catch (error) {
      alert("sorry, we cannot update, please contact support");
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${API}/playlists/${id}/songs-playlist/${id}`);

      let filteredArray = songsInPlaylist.filter((item) => item.id !== id);

      setSongsInPlaylist(filteredArray);
      alert("song was deleted");
    } catch (error) {
      console.log(error);
    }
  }

  function showData() {
    return (
      <ul className="list-group">
        {songsInPlaylist.map((song) => {
          return (
            <li
              key={song.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <PlaylistSong
                key={song.id}
                song={song}
                fromParentSongsHandleSubmit={handleEdit}
                handleDelete={handleDelete}
                viewEditToggleForm={viewEditToggleForm}
                setViewEditToggleForm={setViewEditToggleForm}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  function toggleView() {
    setViewNewSongToggleForm(!viewNewSongToggleForm);
  }

  return (
    <div className="container">
      <button onClick={toggleView}>New Song</button>
      {viewNewSongToggleForm && (

        <PlaylistSongForm fromParentSongsHandleSubmit={handleAdd}>
          <h5>Add New Song in Playlist</h5>
        </PlaylistSongForm>
      )}

      <div>
        {songsInPlaylist.length === 0 ? (
          <p> No songs. Please make some songs! </p>
        ) : (
          showData()
        )}
      </div>
    </div>
  );
}

export default PlaylistSongs;
