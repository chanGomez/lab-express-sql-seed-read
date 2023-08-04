import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Songs from './components/Songs/Songs';
import NewSong from './components/NewSong/NewSong';
import Song from './components/Song/Song';
import EditSong from './components/EditSong/EditSong'
import Playlists from './components/Playlists/Playlists'
import Playlist from './components/Playlists/Playlist'
import EditPlaylist from './components/Playlists/EditPlaylists'
import NewPlaylist from './components/NewPlaylist/NewPlaylist'
import Nav from './components/Nav/Nav';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Routes> 
          <Route path="/" element={<Home/>}></Route>
          <Route path="/songs" element={<Songs/>}></Route>
          <Route path="/songs/:id" element={<Song/>}></Route>
          <Route path="/songs/new" element={<NewSong/>}></Route>
          <Route path="/songs/:id/edit" element={<EditSong/>} />
          <Route path="/playlists" element={<Playlists/>} />
          <Route path="/playlists/new" element={<NewPlaylist/>} />
          <Route path="/playlists/:id" element={<Playlist/>} />
          <Route path="/playlists/:id/edit" element={<EditPlaylist/>} />
          <Route path="/404" element={<h1>404 Not found!</h1>} />
          <Route path="*" element={<h1>404 Not found!</h1>} /> */
        </Routes>
      </Router>
    </div>
  );
}

export default App;