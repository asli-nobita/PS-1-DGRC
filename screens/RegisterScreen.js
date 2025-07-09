import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>
        Let’s get you <Text style={{ color: '#143F6B' }}>Registered</Text>
      </Text>
      <Text style={styles.subtitle}>Fill your details to create an account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={{ color: '#D72638', fontWeight: 'bold' }}>Login</Text>
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
    backgroundColor: '#143F6B',
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
  loginText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#666'
  }
});
