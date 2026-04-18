import React, { useContext, useEffect } from 'react';
import { MusicContext } from '../context/MusicContext';
import SongList from '../components/SongList';
import UploadForm from '../components/UploadForm';

const Dashboard = () => {
  const { loadSongs } = useContext(MusicContext);

  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <div className="dashboard">
      <div className="upload-section">
        <UploadForm />
      </div>
      <div className="song-list">
        <SongList />
      </div>
    </div>
  );
};

export default Dashboard;