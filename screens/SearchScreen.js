import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = () => {
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  )
}

export default SearchScreen
/*export default SearchScreen
import { View, Text } from 'react-native'
import React from 'react'

import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/search';

export const SearchScreen = async (query, page = 1, limit = 10) => {
  try {
    const response = await axios.get(apiUrl, { params: { query, page, limit } });
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
  }
};*/




const DataFetchingWithAxios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then((response) => {
        setData(response.data);  // Set the data from API response
        setLoading(false);  // Stop loading when data is fetched
      })
      .catch((err) => {
        setError(err);  // Set error if request fails
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};


const DataFetchingExample = () => {
  const [data, setData] = useState([]);  // State to store fetched data
  const [loading, setLoading] = useState(true);  // State to track loading
  const [error, setError] = useState(null);  // State for any potential errors

  // Fetch data using useEffect when component mounts
  useEffect(() => {
    fetch('https://api.example.com/data')  // Replace with your API URL
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);  // Set the fetched data into state
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError(err);  // If there is an error, set error state
        setLoading(false);  // Set loading to false
      });
  }, []);  // Empty dependency array means this runs only once when component mounts

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;  // Show loading spinner while data is being fetched
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;  // Display error if any
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}  // Adjust the keyExtractor based on your data
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>  {/* Adjust based on the structure of your data */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
