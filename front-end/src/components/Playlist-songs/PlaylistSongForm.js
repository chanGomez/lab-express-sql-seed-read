import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PlaylistSongForm(props) {
  let { id } = useParams();
  const { songDetails } = props;

  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    time: "",
    is_favorite: false,
    playlist_id: id,
  });

  useEffect(() => {
    if (songDetails) {
      setSong(songDetails);
    }
  }, [id, songDetails, props]);

  function handleTextChange(event) {
    setSong({ ...song, [event.target.id]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.fromParentSongsHandleSubmit(song);

    if (songDetails) {
      props.toggleView();
    }

    setSong({
      title: "",
      artist: "",
      album: "",
      time: "",
      is_favorite: false,
      playlist_id: id,
    });
  }

  const handleCheckboxChange = (e) => {
    setSong({
      ...song,
      is_favorite: !song.is_favorite,
    });
  };

  return (
    <div className="Edit">
      {props.children}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title:</label>
        <input
          required
          type="text"
          id="title"
          value={song.title}
          onChange={handleTextChange}
        />

        <label htmlFor="artist"> artist:</label>
        <input
          required
          type="text"
          name="artist"
          id="artist"
          value={song.artist}
          onChange={handleTextChange}
        />

        <label htmlFor="album"> album:</label>
        <input
          required
          type="text"
          name="album"
          id="album"
          value={song.album}
          onChange={handleTextChange}
        />

        <label htmlFor="time"> time:</label>
        <input
          required
          type="text"
          name="time"
          id="time"
          onChange={handleTextChange}
          value={song.time}
        />

        <label htmlFor="content"> Favorite:</label>
        <input
          type="checkbox"
          name="is_favorite"
          id="is_favorite"
          onChange={handleCheckboxChange}
          checked={song.is_favorite}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default PlaylistSongForm;
