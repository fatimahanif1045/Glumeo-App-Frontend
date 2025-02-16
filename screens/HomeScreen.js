import React, { useEffect, useState } from 'react';
import { getVideos } from '../services/video';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList , Button, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ip_Address } from '../services/user';

const HomeScreen = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch videos when the component mounts
    const fetchVideos = async () => {
      try {
        const videosData = await getVideos();
        //console.log('Fetched Videos:', videosData); 
        setVideos(videosData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading videos...</Text>
      </View>
    );
  }
  
  if (videos.length === 0) {
    return <Text style={styles.videoName}>No videos available.</Text>;
  }

  // Render the list of videos
  const renderVideoItem = ({ item }) => (
    <View style={styles.videoCard}>
      <Image
        source={{ uri: `${ip_Address}/uploads/thumbnails/${item.thumbnailName}` }} // Assuming the thumbnail is served from your backend
        style={styles.thumbnail}
      />
      {console.log(`${ip_Address}/uploads/thumbnail/${item.thumbnailName}`)}

      <Text style={styles.videoName}>{item.videoName}</Text>
    </View>
  );
  HomeScreen.navigationOptions = {
    title: 'Welcome to Glumeo', // Custom title for the header
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  videoCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  videoName: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;


/*
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialIcons name="account-circle" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body}>
        <View style={styles.cardContainer}>
          {/* Card 1 
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trending News</Text>
            <Text style={styles.cardContent}>Stay updated with the latest news...</Text>
          </View>
          {/* Card 2 
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weather Updates</Text>
            <Text style={styles.cardContent}>Current weather: Sunny, 25°C</Text>
          </View>
          {/* Card 3 
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Notifications</Text>
            <Text style={styles.cardContent}>You have 3 new notifications.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar 
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="search" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="notifications" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
  },
  body: {
    padding: 15,
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '30%',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: '#4a90e2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Shadow for Android
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#4a90e2',
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

*/