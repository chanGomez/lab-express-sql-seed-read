const db =  require("../db/dbConfig")

//get all play lists
const getAllPlaylists = async () =>{
    try {
        const allPlaylists = await db.any("SELECT * FROM playLists")
        console.log(allPlaylists);
        return allPlaylists
    } catch (error) {
        return error
    }
}


const getPlaylistById = async (id) => {
    try {
        const playlistById = await db.any("SELECT * FROM playLists WHERE id=$1", id)
        console.log(playlistById);
        return playlistById
    } catch (error) {
        return error
    }
}

const createPlaylist = async (playlist) => {
    try {
        const newPlaylist = await db.one(`INSERT INTO playLists (title)
         VALUES ($1) RETURNING *`, [playlist.title])
        return newPlaylist
    } catch (error) {
        return error
    }
}

const deletePlaylistById = async (id) => {
    try {
       const deletePlaylist = await db.any("DELETE FROM playLists WHERE id=$1 RETURNING *", id)
       return deletePlaylist

    } catch (error) {
        return error
    }
}

const updatePlaylistById = async (id, playlist) => {
    try {
      let dynamicValues = Object.values(playlist);
  
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
  
      let queryString = makeQueryString(playlist);
  
      const updatedBookmark = await db.any(
        `UPDATE playlists SET ${queryString} WHERE id = $1 RETURNING *`,
        [id, ...dynamicValues]
      );
      return updatedBookmark;
    } catch (error) {
      return error;
    }
  };


module.exports = { 
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    deletePlaylistById,
    updatePlaylistById
}