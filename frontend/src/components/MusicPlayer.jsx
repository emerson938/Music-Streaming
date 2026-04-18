import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';

const MusicPlayer = () => {
  const { currentSong, isPlaying, playSong, pause, next, previous, currentTime, duration, seek, setVolume, volume } = useContext(MusicContext);

  if (!currentSong) return null;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    seek(newTime);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value / 100);
  };

  return (
    <div className="music-player">
      <div className="player-info">
        <h4>{currentSong.title}</h4>
        <p>{currentSong.artist}</p>
      </div>
      <div className="player-controls">
        <button onClick={previous} className="control-btn">⏮️</button>
        <button onClick={isPlaying ? pause : () => playSong(currentSong)} className="control-btn play-btn">
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={next} className="control-btn">⏭️</button>
      </div>
      <div className="progress-container">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="progress-bar"
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="volume-control">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;