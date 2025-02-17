import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getVideos } from '../services/video';
import { ip_Address } from '../services/user';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await getVideos();
        setVideos(videosData);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="pink" />         
      </View>
    );
  }

  if (!videos.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No videos available.</Text>
      </View>
    );
  }

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => navigation.navigate('VideoDetail', { video: item })}
    >
      <Image
        source={{ uri: `${ip_Address}/uploads/thumbnail/${item.thumbnailName}` }}
        style={styles.thumbnail}
      />
      <View style={styles.videoInfo}>
        <Text style={styles.userName}>{item.user?.userName || 'Unknown User'}</Text>
        <Text style={styles.videoTitle}>{item.title}</Text>
        {item.description && <Text style={styles.videoDescription}>{item.description}</Text>}
        {item.tag.length > 0 && <Text style={styles.videoTags}>#{item.tag.join(' #')}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb"]} style={styles.container}>
      <ScrollView>
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item._id}
          numColumns={2} // Display 2 videos per row
          columnWrapperStyle={styles.rowContainer}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  rowContainer: {
    justifyContent: 'space-between',
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    width: '48%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  videoInfo: {
    padding: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  videoTags: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default HomeScreen;
