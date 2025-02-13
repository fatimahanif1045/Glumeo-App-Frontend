
//use AsyncStorage to save the JWT token on login and use it for authenticated API calls.
//Implement a protected route that checks for the JWT token before rendering specific components.

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { logIn, getToken } from '../services/userServices';  // Import the logIn function from userService

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');     // useState(null);
  const [loading, setLoading] = useState(false);
  
const handleLogin = async () => {
  if (!email || !password) {
    setError('All fields are required');
    return;
  }

  setLoading(true);
  try {
    const data = await logIn(email, password);  // Call the API function
    if (data.success && (await getToken())) {
      setIsAuthenticated(true);  // Update authentication state
      navigation.navigate('Home')
    }
  } catch (err) {
    setError(err.message || 'Error logging in');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title={loading ? 'Logging In...' : 'Log In'} onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
