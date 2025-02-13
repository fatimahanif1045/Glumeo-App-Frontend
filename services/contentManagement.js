// services/contentManagement.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/content';

export const uploadContent = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/upload`, data);
    return response.data;
  } catch (error) {
    throw new Error('Upload failed');
  }
};

export const deleteContent = async (contentId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${contentId}`);
    return response.data;
  } catch (error) {
    throw new Error('Delete failed');
  }
};

export const editContent = async (contentId, updatedData) => {
  try {
    const response = await axios.put(`${apiUrl}/${contentId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Edit failed');
  }
};
