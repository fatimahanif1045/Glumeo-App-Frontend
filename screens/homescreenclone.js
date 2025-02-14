import React, { useEffect, useState } from 'react';
import { View, Text, Button, AsyncStorage, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const homescreenclone = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        navigation.navigate('Auth'); // Navigate to Auth (Login/Signup) if no token found
      } else {
        setToken(storedToken);
      }
    };

    checkAuth();
  }, [navigation]);

/*
  axios.get('http://yourbackendapi.com/tasks')
  .then(response => setData(response.data))
  .catch(error => console.error(error));

*/
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    Alert.alert('Logged out', 'You have been logged out');
    navigation.navigate('Auth');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {token ? (
        <>
          <Text>Welcome back! You are logged in.</Text>
          <Button title="Log Out" onPress={handleLogout} />
        </>
      ) : (
        <Text>You are not logged in.</Text>
      )}
    </View>
  );
};

export default homescreenclone;




/*
// screens/HomeScreen.js
import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button 
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Welcome to Glumeo', // Custom title for the header
};

export default HomeScreen;
*/





import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialIcons name="account-circle" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Body */}
      <ScrollView style={styles.body}>
        <View style={styles.cardContainer}>
          {/* Card 1 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trending News</Text>
            <Text style={styles.cardContent}>Stay updated with the latest news...</Text>
          </View>
          {/* Card 2 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weather Updates</Text>
            <Text style={styles.cardContent}>Current weather: Sunny, 25°C</Text>
          </View>
          {/* Card 3 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Notifications</Text>
            <Text style={styles.cardContent}>You have 3 new notifications.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
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

