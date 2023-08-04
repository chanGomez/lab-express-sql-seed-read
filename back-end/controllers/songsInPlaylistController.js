const express = require("express");
const router = express.Router({ mergeParams: true });

const { 
    getAllSongsInPlaylist, 
    getSongsByIdInPlaylist, 
    deleteSongInPlaylistById,
    createSongInplaylist,
    updateSongById,
    getAllSongsOnPlaylistId
 } = require("../queries/songsInPlaylist");

//  const { checkTitle, checkIs_favorite, checkArtist } = require ("../validations/checkSongs")


router.get("/", async (req, res) => {
  const allSongsInPlaylist = await getAllSongsInPlaylist(req.params.playlistId);

  if (allSongsInPlaylist.length === 0) {
    res.status(404).json({ error: "not found" });
  } else {
    res.json(allSongsInPlaylist);
  }
});

router.get("/:songId", async (req, res) => {
    try {
      const songInPlaylist = await getSongsByIdInPlaylist(
        req.params.playlistId,
        req.params.songId
      );
  
      if (songInPlaylist.length === 0) {
        throw {
          status: 404,
          message: "Review not found",
        };
      } else {
        return res.json(songInPlaylist[0]);
      }
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    const deletedSong = await deleteSongInPlaylistById(id);
  
    if (deletedSong.length === 0) {
      return res.status(404).json({ error: "Song not found" });
    } else {
      return res.json(deletedSong[0]);
    }
  });

  router.post("/", async (req, res) => {
    const createdSong = await createSongInplaylist(req.body);
  
    res.json(createdSong[0]);
  });
  
  router.put("/:id", async (req, res) => {
    const updatedSong = await updateSongById(req.params.id, req.body);
  
    if (updatedSong.length === 0) {
      return res.status(404).json({ error: "Song not found" });
    } else {
      return res.json(updatedSong[0]);
    }
  });

  router.get("/:playlistid/get-all-songs", async (req, res) => {
    const { playlistid } = req.params;
  
    try {
      const allSongsById = await getAllSongsOnPlaylistId(playlistid);
  
      if (allSongsById.length === 0) {
        return res.status(404).json({ error: "Songs not found" });
      } else {
        console.log(allSongsById);
        return res.json(allSongsById);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  

module.exports = router;
