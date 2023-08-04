import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="container">
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          TUNER
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link className={"nav-link"}to="/songs">Songs</Link>
            </li>
            <li className="nav-item">
            <Link className={"nav-link"}to="/songs/new">New Song</Link>
            </li>
            <li className="nav-item">
            <Link className={"nav-link"}to="/playlists">Playlists</Link>
            </li>
            <li className="nav-item">
            <Link className={"nav-link"}to="/playlists/new">New Playlist</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default Nav;
