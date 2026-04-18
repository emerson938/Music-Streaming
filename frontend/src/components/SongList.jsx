import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';

const SongList = () => {
  const { songs, playSong, currentSong, isPlaying } = useContext(MusicContext);

  return (
    <div>
      <h2>Your Songs</h2>
      {songs.length === 0 ? (
        <p>No songs uploaded yet. Upload some music to get started!</p>
      ) : (
        <div>
          {songs.map(song => (
            <div key={song._id} className="song-item">
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist} {song.album && `- ${song.album}`}</p>
              </div>
              <button
                onClick={() => playSong(song)}
                className="play-btn"
                disabled={currentSong?._id === song._id && isPlaying}
              >
                {currentSong?._id === song._id && isPlaying ? 'Playing' : 'Play'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongList;