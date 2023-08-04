const express = require("express");
const router = express.Router();

const songsInPlaylistController = require("./songsInPlaylistController")

router.use("/:playlistId/songs-playlist", songsInPlaylistController)

const {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    deletePlaylistById,
    updatePlaylistById
    
} = require("../queries/playLists")

const { checkTitle } = require ("../validations/checkSongs")

router.get("/", async (req, res)=>{
    const allPlaylists = await getAllPlaylists();

    if (Array.isArray(allPlaylists)) {
      res.json(allPlaylists);
    } else {
      res.status(500).json({ error: "Server error" });
    }
  
})

router.get("/:id", async (req, res) =>{
    const { id } = req.params

    const playlist = await getPlaylistById(id)

    if (playlist.length === 0 ) {
        res.status(500).json({ error: "Playlist not found!" });
      } else {
        res.status(200).json(playlist[0]);
      }
})

router.post("/", checkTitle, async (req, res) => {

    const playlist = await createPlaylist(req.body)
    res.json(playlist)

})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
  
      const deletePlaylist = await deletePlaylistById(id);
  
      if (deletePlaylist.length === 0){
        res.status(400).json({ error: "Playlist not found!" });
      }else{
        res.json(deletePlaylist[0])
      }
  
  })

  router.put("/:id", checkTitle, async (req, res) => {
    const updatedPlaylist = await updatePlaylistById(req.params.id, req.body);
  
    if (updatedPlaylist.length === 0) {
      res.status(404).json({ message: "not found!", error: true });
    } else {
      res.json(updatedPlaylist[0]);
    }
  });

module.exports = router;