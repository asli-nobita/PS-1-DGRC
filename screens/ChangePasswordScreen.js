import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView
} from 'react-native';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    // Add your password update logic/API here
    Alert.alert('Success', 'Your password has been updated.');
    navigation.goBack(); // Or navigate to another screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo and Heading */}
      <Image source={require('../assets/password.png')} style={styles.logo} />
      <Text style={styles.title}>Change Password</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Current Password"
        secureTextEntry
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003f7f',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#B22222',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

