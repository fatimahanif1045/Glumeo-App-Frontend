import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { fetchUserDetails, updateUserDetails, ip_Address } from '../services/user';

const EditProfileScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    userName: '',
    profilePicture: '',
    about: '',
    gender: '',
  });

  const imgUrl= `${ip_Address}${user.profilePicture}` //confirm ip address using ipconfig

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchUserDetails();
        setUser({
          name: data.name || '',
          userName: data.userName || '',
          profilePicture: data.profilePicture || imgUrl,
          about: data.about || '',
          gender: data.gender || '',
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching user details:', error);
      }
    };

    loadUserDetails();
  }, []);

  if (loading) {
      return (
        <View style={styles.Activitycontainer}>
          <ActivityIndicator size={100} color='pink' animating={true} />
        </View>
      );
    }
  
  const handleUpdateProfile = async () => {
    try {
      console.log('useruseruser', user)
      const response = await updateUserDetails(user);
      if (response.success) {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update profile.");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <LinearGradient colors={["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>Edit Profile</Text>

        <Image source={{ uri: imgUrl }} style={styles.profilePic} />

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={user.userName}
          onChangeText={(text) => setUser({ ...user, userName: text })}
          placeholder="Enter your username"
        />

        <Text style={styles.label}>About</Text>
        <TextInput
          style={styles.input}
          value={user.about}
          onChangeText={(text) => setUser({ ...user, about: text })}
          placeholder="Tell something about yourself"
          multiline
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={user.gender}
          onChangeText={(text) => setUser({ ...user, gender: text })}
          placeholder="Enter your gender"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    Activitycontainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default EditProfileScreen;
