import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8000/api/user';    // Base URL of the backend API

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);  // Store the token
  } catch (error) {
    console.error('Error storing token', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');  // Retrieve the token
    return token;
  } catch (error) {
    console.error('Error retrieving token', error);
    return null;
  }
};

export const signUp = async (name, userName, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user-signup`, { name, userName, email, password });
    return response.data;
  } catch (error) {
    console.error('Axios error:', error.response ? error.response.data : error.message);
    throw error.response?.data || 'Error signing up';
  }
};

export const logIn = async (email, password) => {
  try {    
    const response = await axios.post(`${API_URL}/user-login`, { email, password });
    const { token } = response.data;
    await storeToken(token);  // Store token upon successful login
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error logging in';
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');  // Clear the token
    console.log('Logged out successfully');
    
    // Optionally, make a request to the backend to invalidate the token (JWT)
   /* const token = await getToken();
    if (token) {
      await axios.post(`${API_URL}/user-logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    */
    // Redirect or update state to show login screen
    return { success: true };
  } catch (error) {
    console.error('Error logging out', error);
    throw error;
  }
};
