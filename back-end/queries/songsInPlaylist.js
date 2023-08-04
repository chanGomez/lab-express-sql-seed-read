const db = require("../db/dbConfig");

//Below is code for getting songs inside of playlists

const getAllSongsInPlaylist = async (playlistId) => {
  try {
    const allSongs = await db.any(
      `SELECT * FROM songs where playlist_id = $1 ORDER BY id ASC`,
      playlistId
    );
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getSongsByIdInPlaylist  = async (playlistId, songsId) => {
  try {
    // const oneReview = await db.any(`SELECT * FROM reviews WHERE id = $1`, id);
    const oneSong = await db.any(
        //title and id come out as abmbigous
      `
      SELECT playList_id,
      artist, 
      album, 
      time, 
      is_favorite
      FROM playLists JOIN 
      songs ON playLists.id = songs.playList_id 
      WHERE playLists.id = $1 AND songs.id = $2; 
    `,
      [playlistId, songsId]
    );

    return oneSong;
  } catch (error) {
    return error;
  }
};

const deleteSongInPlaylistById = async (id) => {
    try {
      const deleteSongInPlaylist = await db.any(
        `DELETE FROM songs WHERE id = $1 RETURNING *`,
        id
      );
  
      return deleteSongInPlaylist;
    } catch (error) {
      return error;
    }
  };

  const createSongInplaylist = async (song, playListId) => {
    try {
      const newSong = await db.any(
        `INSERT INTO songs 
        (playlist_id, title, artist, 
            album, time, is_favorite) 
        VALUES 
        ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          song.playListId,
          song.title,
          song.artist,
          song.album,
          song.time,
          song.is_favorite
        ]
      );
  
      return newSong;
    } catch (error) {
      return error;
    }
  };

  const updateSongById = async (id, song) => {
    let { title, artist, album, time, is_favorite } = song;
    try {
      const UpdatedSong = await db.any(
        `UPDATE songs SET title = $1, artist = $2, album = $3, time = $4, is_favorite = $5 
        WHERE id = $6 RETURNING *`,
        [title, artist, album, time, is_favorite, id]
      );
  
      return UpdatedSong;
    } catch (error) {
      return error;
    }
  };

  const getAllSongsOnPlaylistId = async (playlist_id) => {
    try {
      // const allReviews = await db.any(
      //   `SELECT * FROM reviews WHERE bookmark_id = $1 RETURNING *`,
      //   bookmark_id
      // );
  
      const allSongs = await db.any(
        `SELECT * FROM playLists INNER JOIN songs ON songs.playlist_id = playList.id 
        WHERE songs.playlist_id = $1 `,
        playlist_id
      );
  
      // `SELECT * FROM reviews WHERE exists (select * from bookmarks WHERE $1 = reviews.bookmark_id)`
  
      return allSongs;
    } catch (error) {
      return error;
    }
  };


module.exports = {
  getAllSongsInPlaylist,
  getSongsByIdInPlaylist,
  deleteSongInPlaylistById,
  createSongInplaylist,
  updateSongById,
  getAllSongsOnPlaylistId
};
