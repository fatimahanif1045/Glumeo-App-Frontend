import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';

const EditProfileScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data'); // Replace with your URL
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        // Log error and display it to the user
        console.error('Error fetching data:', err);
        setError(err.message);
        Alert.alert('Error', 'There was an issue fetching the data.');
      } finally {
        setLoading(false); // Always set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>EditProfileScreen</Text>

      <Text>Data:</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>


      <Button title="Fetch Data" onPress={handleButtonPress} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}

      {data && (
        <View>
          <Text>Data:</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

const handleButtonPress = async () => {
  setLoading(true);  // Set loading state before starting the request
  setError(null);    // Reset any previous errors
  try {
    const response = await fetch('https://api.example.com/data'); // Replace with your URL
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    setData(result);  // Update the state with the response data
  } catch (err) {
    console.error('Error fetching data:', err);
    setError(err.message);  // Store the error message
    Alert.alert('Error', `There was an issue fetching the data: ${err.message}`);
  } finally {
    setLoading(false);  // Set loading to false after the request completes
  }
};

export default EditProfileScreen
