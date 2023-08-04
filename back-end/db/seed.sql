\c songs_dev;

INSERT INTO 
    playLists ( title )
VALUES
('Main Character'),
('Highway'),
('Basketball');

INSERT INTO 
    songs (playList_id, name, artist, album, time, is_favorite)
 VALUES
('1', 'Starboy', 'The Weeknd', 'Starboy', '4:32', true),
('3', 'Where She Go', 'Bad Bunny', 'Single', '3:51', true),
('2', 'After Hours', 'The Weeknd', 'After Hours', '4:12', true),
('1','Kissland', 'The Weeknd', 'Pretty', '4:12', true),
('2', 'Channel Orange', 'Frank Ocean', 'Pink Matter', '4:28', false);
