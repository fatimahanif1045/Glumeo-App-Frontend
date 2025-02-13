import { View, Text } from 'react-native'
import React from 'react'

const UploadContent = () => {
  return (
    <View>
      <Text>UploadContent</Text>
    </View>
  )
}

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