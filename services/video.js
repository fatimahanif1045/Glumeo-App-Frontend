import axios from 'axios';
import { getToken } from './auth';  

const API_URL = 'http://10.0.2.2:8000/api/user/videos';

export const uploadVideo = async (formData) => {
  try {
    const token = await getToken();

    const response = await axios.post(`${API_URL}/upload-video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    //  onUploadProgress: (progressEvent) => {
    //    console.log('Upload Progress:', progressEvent.loaded / progressEvent.total);
    //  },
    });
    return response.data;
  } catch (error) {
    throw new Error('Upload failed');
  }
};

export const searchVideo = async (query, page = 1, limit = 4, sortBy = 'date') => {
  console.log ('query, page, limit, sortBy ',query, page, limit, sortBy )

  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/search-video`, {
      params: { query, page, limit, sortBy },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log ('response.data ',response.data)
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
  }
};

export const deleteVideo= async (contentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${contentId}`);
    return response.data;
  } catch (error) {
    throw new Error('Delete failed');
  }
};

export const editVideo = async (contentId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${contentId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Edit failed');
  }
};

export const getVideos = async () => {
  try {
    // Retrieve the token using the getToken function
    const token = await getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/get-videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    
    return response.data.data.Videos; // Extract the Videos array from the response
  } catch (error) {
    console.error('Error: ', error);
    console.error('Error fetching videos: ', error.response ? error.response.data : error.message);
    throw error;
  }
};
