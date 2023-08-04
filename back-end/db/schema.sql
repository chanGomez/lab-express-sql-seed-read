DROP DATABASE IF EXISTS tuner;

CREATE DATABASE tuner;

\c tuner;

DROP TABLE IF EXISTS playLists;

CREATE TABLE playLists (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN,
--  NOT NEED?
--  playList_id INTEGER REFERENCES playLists (id)
--  ON DELETE CASCADE
 playList_id INTEGER REFERENCES playLists (id)
);
