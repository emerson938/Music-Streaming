import React, { useState, useContext } from 'react';
import { musicService } from '../services/musicService';
import { MusicContext } from '../context/MusicContext';

const UploadForm = () => {
  const [formData, setFormData] = useState({ title: '', artist: '', album: '', music: null });
  const [uploading, setUploading] = useState(false);
  const { loadSongs } = useContext(MusicContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('artist', formData.artist);
    data.append('album', formData.album);
    data.append('music', formData.music);

    try {
      await musicService.uploadMusic(data);
      loadSongs();
      setFormData({ title: '', artist: '', album: '', music: null });
      alert('Music uploaded successfully!');
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Upload Music</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Artist"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Album (optional)"
          value={formData.album}
          onChange={(e) => setFormData({ ...formData, album: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFormData({ ...formData, music: e.target.files[0] })}
          required
        />
      </div>
      <button type="submit" className="btn" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default UploadForm;