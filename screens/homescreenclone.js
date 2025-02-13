import React, { useEffect, useState } from 'react';
import { View, Text, Button, AsyncStorage, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const homescreenclone = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        navigation.navigate('Auth'); // Navigate to Auth (Login/Signup) if no token found
      } else {
        setToken(storedToken);
      }
    };

    checkAuth();
  }, [navigation]);

/*
  axios.get('http://yourbackendapi.com/tasks')
  .then(response => setData(response.data))
  .catch(error => console.error(error));

*/
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    Alert.alert('Logged out', 'You have been logged out');
    navigation.navigate('Auth');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {token ? (
        <>
          <Text>Welcome back! You are logged in.</Text>
          <Button title="Log Out" onPress={handleLogout} />
        </>
      ) : (
        <Text>You are not logged in.</Text>
      )}
    </View>
  );
};

export default homescreenclone;




/*
// screens/HomeScreen.js
import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button 
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Welcome to Glumeo', // Custom title for the header
};

export default HomeScreen;
*/
