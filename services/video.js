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
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/search-video`, {
      params: { query, page, limit, sortBy },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
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
    
    return response.data.data.Videos; // Extract the Videos array from the response
  } catch (error) {
    console.error('Error: ', error);
    console.error('Error fetching videos: ', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteVideo= async (video) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-video`, video, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
  });
    return response.data;
  } catch (error) {
    throw new Error('Delete failed');
  }
};

export const likeVideo= async (video) => {
  try {
    const response = await axios.post(`${API_URL}/react-video`, {video}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
});
    return response.data;
  } catch (error) {
    throw new Error('Like failed');
  }
};

export const getLikes = async (video) => {
  try {
    // Retrieve the token using the getToken function
    const token = await getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/check-react`, {video}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.reactedVideo;
  } catch (error) {
    console.error('Error: ', error);
    console.error('Error fetching likes:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const commentVideo= async ({video,comment}) => {
  try {
    const response = await axios.post(`${API_URL}/comment-video`, {video,comment}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
});
    return response.data.data.comment;
  } catch (error) {
    throw new Error('Comment failed');
  }
};

export const getcomments = async (video) => {
  try {
    // Retrieve the token using the getToken function
    const token = await getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/check-comment`, {video}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data.data.comments; // Extract the Videos array from the response
  } catch (error) {
    console.error('Error: ', error);
    console.error('Error fetching comments:', error.response ? error.response.data : error.message);
    throw error;
  }
};
