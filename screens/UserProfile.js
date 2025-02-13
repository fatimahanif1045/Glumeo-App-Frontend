// services/userProfile.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/users';

export const UserProfile = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile');
  }
};

export const editUserProfile = async (userId, updatedProfile) => {
  try {
    const response = await axios.put(`${apiUrl}/${userId}`, updatedProfile);
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit profile');
  }
};

export const deleteUserAccount = async (userId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Account deletion failed');
  }
};
