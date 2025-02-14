import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signUp } from '../services/auth';
import LinearGradient from 'react-native-linear-gradient';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');     //useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !name || !userName) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const data = await signUp(name, userName, email, password);  
      
      if (data.success) {
        console.log('Signup successful:', data);
        navigation.navigate('Login'); 
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb"]} style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
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
      <Button title={loading ? 'Signing Up...' : 'Sign Up'} onPress={handleSignup} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Text>
    </View>
        </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
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
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignupScreen;
