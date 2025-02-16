import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import { Video } from 'react-native-video'; // Add this for video preview  

import { uploadVideo } from '../services/video';

const UploadScreen = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  // Open video picker (Gallery)
  const pickVideo = () => {
    launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (!response.didCancel && !response.error) {
        setVideo(response.assets[0].uri);
      }
    });
  };

  // Handle upload action
  const handleUpload = async () => {
    if (!video) {
      Alert.alert('No Video', 'Please select a video to upload.');
      return;
    }
    if (!title || !description || !tags) {
      Alert.alert('Missing Info', 'Please fill out all fields.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tag', tags);
    formData.append('video', {
      uri: video,
      type: 'video/mp4',
      name: 'video.mp4',
    });
    try {
      const response = await uploadVideo(formData);
      if (response.success) {
        setLoading(false);
        Alert.alert('Upload Successful', 'Your video has been uploaded.');
        setTitle('');
        setDescription('');
        setTags('');
        setVideo(null);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Upload Failed', 'There was an error uploading your content.');
    }
  };

  return (
    <LinearGradient colors={["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb"]} style={styles.container}>
      <Text style={styles.header}>Upload Content</Text>

      {/* Video Preview */}
      {video && <Video source={{ uri: video }} style={styles.imagePreview} />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickVideo}>
          <Ionicons name="videocam" size={24} color="white" />
          <Text style={styles.buttonText}>Gallery (Video)</Text>
        </TouchableOpacity>

      </View>

      {/* Text Inputs for title, description, and tags */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags (comma separated)"
        placeholderTextColor="#888"
        value={tags}
        onChangeText={setTags}
      />

      {/* Upload Button */}
      <TouchableOpacity
        style={[styles.uploadButton, !video && { opacity: 0.6 }]}
        disabled={!video || loading}
        onPress={handleUpload}
      >
        {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.uploadText}>Upload</Text>}
      </TouchableOpacity>
    </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    color: '#000',
    fontSize: 16,
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  uploadText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UploadScreen;