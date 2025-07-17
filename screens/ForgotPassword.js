import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ForgotPassword({ navigation }) {
  const [username, setUsername] = useState('');

  const handleSendOtp = () => {
    if (username.trim()) {
      // Send OTP to backend here if required
      navigation.navigate('OTPVerificationScreen', { username }); // Pass username to OTP screen
    } else {
      alert('Please enter your username');
    }
  };

  return (
    <View style={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 15,
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#D72638',
    marginRight: 6,
  },
  backText: {
    fontSize: 18,
    color: '#D72638',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 8 },
  button: { backgroundColor: '#D72638', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
