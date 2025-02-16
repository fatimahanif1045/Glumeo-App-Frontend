// services/user.js
import axios from 'axios';
import { getToken } from './auth';  

const API_URL = 'http://10.0.2.2:8000/api/user';
export const ip_Address = `http://192.168.10.35:8000`;

export const fetchUserDetails = async (userId) => {
  try {
        const token = await getToken();

        const response = await axios.get(`${API_URL}/current-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });        
        return response.data.data.user; 
  } catch (error) {
    console.error('Error: ', error);
    console.error('Error fetching videos: ', error.response ? error.response.data : error.message);
    throw error;  }
};

export const deleteUser = async () => {
  const token = await getToken();  

  try {
    const response = await axios.delete(`${API_URL}/delete-user`, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const updateUserDetails = async (updateProfile) => {
  const token = await getToken(); 
console.log('updateProfile',updateProfile)
  try {
    const response = await axios.put(`${API_URL}/update-user`, updateProfile , {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });

    console.log('response.data',response.data)
    return response.data; 
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};
