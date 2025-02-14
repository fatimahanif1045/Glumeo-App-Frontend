import axios from 'axios';
import { getToken } from './auth';  

// Define your backend API URL
const API_URL = 'http://10.0.2.2:8000/api/user/videos/get-videos';

// Function to get videos
export const getVideos = async () => {
  try {
    // Retrieve the token using the getToken function
    const token = await getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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