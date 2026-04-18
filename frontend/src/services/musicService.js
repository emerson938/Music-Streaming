import api from './api';

const musicService = {
  uploadMusic: (data) => api.post('/music/upload', data),
  // Add other methods as needed, e.g., getSongs, streamMusic, etc.
};

export { musicService };