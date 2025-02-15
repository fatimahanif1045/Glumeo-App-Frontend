import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { logout } from '../services/auth';  // Import logout function
import { fetchUserDetails, deleteUser, ip_Address } from '../services/user';

const ProfileScreen = ({ navigation, setIsAuthenticated }) => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

 const imgUrl= `${ip_Address}${userDetails.profilePicture}` //confirm ip address using ipconfig

  useEffect(() => {
    // Fetch User when the component mounts
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserDetails();
        console.log('Fetched User Details:', data);
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading User:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={100} color='pink' animating={true} />
      </View>
    );
  }

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleDeleteProfile = () => {
    Alert.alert("Delete Account", "Are you sure you want to permanently delete your account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", onPress: async () => {
          const data = await deleteUser();
          if (data.success) {
            console.log("Account deleted");
            await logoutLogic();
          }
        }
      }
    ]);
  };

  const logoutLogic = async () => {
    {
      const data = await logout();
      console.log("You have been logged out successfully")
      if (data.success) {
        setIsAuthenticated(false);

        // Reset the navigation stack to the Login screen
        navigation.reset({
          index: 0,  // Reset to the first screen
          routes: [{ name: 'Login' }],
        });
      }
    }
  }
  const handleLogout = async () => {
    try {
      Alert.alert("Logout Account", "Are you sure you want to Logout of your account?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout", onPress: logoutLogic
        }
      ])
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };
  return (
    <LinearGradient colors={["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb"]} style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>

        <Image source={{ uri: imgUrl }} style={styles.profilePic} />

        <Text style={styles.fullName}>{userDetails.name}</Text>
        <Text style={styles.username}>@{userDetails.userName}</Text>
        <Text style={styles.username}>{userDetails.about}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Likes: {userDetails.likes}</Text>
          <Text style={styles.statsText}>Videos: {userDetails.videos}</Text>
        </View>

        <Text style={styles.gender}>Gender   {userDetails.gender}</Text>
        <Text style={styles.email}>{userDetails.email}</Text>
        <Text style={styles.createdAt}>Joined on {userDetails.createdAt}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.editButton, styles.button]} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.deleteButton, styles.button]} onPress={handleDeleteProfile}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  profilePic: {
    width: '50%',
    aspectRatio: 1,
    borderRadius: 100,
    marginTop: 20,

    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: 'tomato',
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  gender: {
    fontSize: 18,
    color: '#666',
  },
  email: {
    fontSize: 16,
    color: '#555',
    margin: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    margin: 10,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 5,
  },
  createdAt: {
    fontSize: 15,
    color: '#999',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 10,
    width: '46%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default ProfileScreen;
