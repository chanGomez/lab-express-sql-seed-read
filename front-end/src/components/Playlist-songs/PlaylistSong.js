import React from "react";
import { Link } from "react-router-dom";
import PlaylistSongForm from "./PlaylistSongForm";

function PlaylistSong({
  song,
  handleDelete,
  viewEditToggleForm,
  setViewEditToggleForm,
  fromParentSongsHandleSubmit,
}) {


  function toggleView() {
    setViewEditToggleForm(!viewEditToggleForm);
  }

  return (
    <div>
      <span>
      <button onClick={toggleView}>Edit</button>
      </span>
      <span>
      {viewEditToggleForm ? (
        <PlaylistSongForm 
        fromParentSongsHandleSubmit={fromParentSongsHandleSubmit}
        toggleView={toggleView}
        songDetails={song}
        />
      ) : (
        <div>
          <span className="badge badge-primary badge-pill">{`${
            song.is_favorite ? "✅" : "❌"}`}
          </span>
          {` - ${song.title} - ${song.artist} - ${song.time}`}
          <span>
            <button onClick={() => handleDelete(song.id)}>Delete</button>
          </span>
        </div>
      )}

      </span>
    </div>
  );
}

export default PlaylistSong;
