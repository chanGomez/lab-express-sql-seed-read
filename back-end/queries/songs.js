const db = require("../db/dbConfig");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getSongsById = async (id) => {
  try {
    const song = await db.any("SELECT * FROM songs WHERE id= $1", id);
    return song;
  } catch (error) {
    return error;
  }
};

const createSong = async (data) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (title, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
      [data.title, data.artist, data.album, data.time, data.is_favorite]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

const deleteSongById = async (id) =>{
    try {
        const deleteSong = await db.any("DELETE FROM songs WHERE id= $1 RETURNING *", id);

        return deleteSong
    } catch (error) {
        return error
    }
}

const updateSongById = async (id, song) => {
  try {
    let dynamicValues = Object.values(song);

    function makeQueryString(data) {
      let count = 2;
      let result = "";

      for (let key in data) {
        result += `${key} = $${count},`;
        count++;
      }
      result = result.substring(0, result.length - 1);
      return result;
    }

    let queryString = makeQueryString(song);

    const updatedSong = await db.any(
      `UPDATE songs SET ${queryString} WHERE id = $1 RETURNING *`,
      [id, ...dynamicValues]
    );
    return updatedSong;
  } catch (error) {
    return error;
  }
};
//Above is code for getting songs
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Below is code for getting songs inside of playlists

// const getAllSongsInPlaylist = async (playlistId) => {
//   try {
//     const allSongs = await db.any(
//       `SELECT * FROM songs where playlist_id = $1 ORDER BY id ASC`,
//       playlistId
//     );
//     return allSongs;
//   } catch (error) {
//     return error;
//   }
// };

// const getSongsByIdInPlaylist  = async (playlistId, songsId) => {
//   try {
//     // const oneReview = await db.any(`SELECT * FROM reviews WHERE id = $1`, id);
//     const oneSong = await db.any(
//       `
//         SELECT playlist_id,
//             name,
//         FROM playLists
//         JOIN songs ON playlist.id = songs.playlist_id
//         WHERE playlist.id = $1
//             AND songs.playlist_id = $2;
//     `,
//       [playlistId, songsId]
//     );

//     return oneSong;
//   } catch (error) {
//     return error;
//   }
// };


module.exports = {
  getAllSongs,
  getSongsById,
  createSong,
  deleteSongById,
  updateSongById,
};
