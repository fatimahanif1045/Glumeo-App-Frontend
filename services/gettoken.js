import axios from 'axios';
import { getToken } from './services/userService';  // Import getToken function

const fetchUserData = async () => {
  const token = await getToken();  // Get the token from AsyncStorage

  if (!token) {
    console.log('No token found!');
    return;
  }

  try {
    const response = await axios.get('http://localhost:8000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,  // Attach token to Authorization header
      },
    });

    console.log('User data:', response.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};





