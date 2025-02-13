// services/user.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/users';

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile');
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${apiUrl}/search`, { params: { query } });
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
  }
};

export const uploadContent = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/upload`, data);
    return response.data;
  } catch (error) {
    throw new Error('Upload failed');
  }
};
