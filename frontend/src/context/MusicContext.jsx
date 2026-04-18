import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const loadSongs = async () => {
    try {
      // Assuming there's an endpoint to get songs, e.g., /music
      const response = await api.get('/music');
      setSongs(response.data);
    } catch (error) {
      console.error('Failed to load songs', error);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const next = () => {
    // Implement next logic
  };

  const previous = () => {
    // Implement previous logic
  };

  const seek = (time) => {
    setCurrentTime(time);
  };

  const setVolumeLevel = (vol) => {
    setVolume(vol);
  };

  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <MusicContext.Provider value={{
      songs,
      loadSongs,
      currentSong,
      isPlaying,
      playSong,
      pause,
      next,
      previous,
      currentTime,
      duration,
      seek,
      setVolume: setVolumeLevel,
      volume
    }}>
      {children}
    </MusicContext.Provider>
  );
};