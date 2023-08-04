const express = require("express");
const router = express.Router({ mergeParams: true });

const { getAllSongs, getSongsById, createSong, deleteSongById, updateSongById } = require("../queries/songs");

const { checkTitle, checkIs_favorite, checkArtist } = require ("../validations/checkSongs")

router.get("/", async (req, res) => {
  const allSongs = await getAllSongs();

  if (Array.isArray(allSongs)) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const song = await getSongsById(id);

  if (song.length === 0) {
    res.status(500).json({ error: "Song not found!" });
  } else {
    res.status(200).json(song[0]);
  }
});

router.post("/", checkTitle, checkIs_favorite, checkArtist, async (req, res) => {

  console.log(req.body);
  const newSong = await createSong(req.body)
  res.json(newSong)

})

router.delete("/:id", async (req, res) =>{
   try {
    const deleteSong = await deleteSongById(req.params.id);

    if (deleteSong.length === 0){
      res.status(400).json({ error: "Song not found!" });
    }else{
      res.json(deleteSong[0])
      //res.json(deleteSong[0]) will avoid giving you an arrat
      //it will send back the object only
    }

   } catch (error) {
    return error
   }
})

router.put("/:id", checkTitle, checkIs_favorite, checkArtist, async (req, res) => {
  const updatedSong = await updateSongById(req.params.id, req.body);

  if (updatedSong.length === 0) {
    res.status(404).json({ message: "not found!", error: true });
  } else {
    res.json(updatedSong[0]);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////
//songs in playlist 


// router.get("/", async (req, res) => {
//   const allSongsInPlaylist = await getAllSongsInPlaylist(req.params.playlistId);

//   if (allSongsInPlaylist.length === 0) {
//     res.status(404).json({ error: "not found" });
//   } else {
//     res.json(allSongsInPlaylist);
//   }
// });

module.exports = router;