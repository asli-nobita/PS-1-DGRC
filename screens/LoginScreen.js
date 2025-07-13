import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In production, validate input and call API
    if (username && password) {
      // Simulate login success
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Error', 'Please enter both User ID and password');
    }
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>
        Let’s get you <Text style={{ color: '#D72638' }}>Logged in</Text>
      </Text>
      <Text style={styles.subtitle}>Enter your information below 👇</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}  onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={{ color: '#143F6B', fontWeight: 'bold' }}>Register</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.welcomeLink}>
          ← Back to Welcome
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Services Provided by NIC Bihar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#EAF6FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 377,
    height: 150,
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#143F6B',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#D72638',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333'
  },
  welcomeLink: {
    marginTop: 10,
    fontSize: 13,
    color: '#555',
    textDecorationLine: 'underline'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#666'
  }
});
