import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { getVideos } from '../services/videoService';

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
        source={{ uri: `http://10.0.2.2:8000/uploads/thumbnails/${item.thumbnailName}` }} // Assuming the thumbnail is served from your backend
        style={styles.thumbnail}
      />
      {console.log(`http://10.0.2.2:8000/uploads/thumbnail/${item.thumbnailName}`)}

      <Text style={styles.videoName}>{item.videoName}</Text>
    </View>
  );

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
