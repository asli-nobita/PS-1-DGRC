import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function ResetPassword({ navigation, route }) {
  const { username } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match');
    } else {
      // Send new password to backend API here
      Alert.alert('Success', 'Your password has been reset.');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Reset Password for {username}</Text>
      <TextInput
        secureTextEntry
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <TextInput
        secureTextEntry
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <Button title="Reset Password" onPress={handleReset} />
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
    color: '#000',
    marginRight: 6,
  },
  backText: {
    fontSize: 18,
    color: '#000',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 8 },
});
