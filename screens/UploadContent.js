import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const UploadContent = () => {
    return (
        <LinearGradient colors={['#ff9a9e', '#fad0c4', '#fad0c4', '#fbc2eb', '#a18cd1']} >
            <View>
            </View>
        </LinearGradient>
    );
};


export default UploadContent

/*
const formData = new FormData();
formData.append('file', {
 // uri: fileUri,
  type: 'video/mp4', // or the appropriate MIME type
  name: 'video.mp4',
});

axios.post('https://api.glumeo.com/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${jwtToken}`,
  },
  onUploadProgress: (progressEvent) => {
    console.log('Upload Progress:', progressEvent.loaded / progressEvent.total);
  },
});
*/



//npm install react-native-image-picker

/*

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Button, Video } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Video } from 'react-native-video'; // Add this for video preview

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null); // To distinguish between image and video

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed', // Allows both images and videos
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorCode);
        } else {
          setMediaUri(response.assets[0].uri);
          setMediaType(response.assets[0].type); // Check if it is an image or video
          setModalVisible(false); // Close modal after selecting the media
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Instagram</Text>
        <TouchableOpacity style={styles.plusButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Media</Text>
            <Button title="Select Media" onPress={openImagePicker} />
            
            {/* If it's an image }
            {mediaType === 'photo' && mediaUri && (
              <Image source={{ uri: mediaUri }} style={styles.previewImage} />
            )}

            {/* If it's a video }
            {mediaType === 'video' && mediaUri && (
              <Video
                source={{ uri: mediaUri }}
                style={styles.previewImage}
                controls={true}
                resizeMode="cover"
              />
            )}

            <View style={styles.actions}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Upload" onPress={() => alert('Media uploaded!')} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.feed}>
        <Text style={styles.feedText}>Feed Content Goes Here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  plusButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: '#0095f6',
    borderRadius: 20,
  },
  plusIcon: {
    fontSize: 30,
    color: 'white',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  previewImage: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  feed: {
    marginTop: 120,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedText: {
    fontSize: 18,
  },
});

*/

//npm install react-native-video

/*
Permissions
You will need to handle permissions for accessing the gallery on both Android and iOS.

For Android:

Add the following permissions to AndroidManifest.xml:
xml
Copy
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
*/