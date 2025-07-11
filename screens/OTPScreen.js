import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function OTP({ navigation, route }) {
  const { username } = route.params;
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  useEffect(() => {
    const tempOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(tempOtp);
    // You may send this OTP to user's email/SMS in a real app
    console.log(`OTP for ${username}: ${tempOtp}`);
  }, []);

  const handleVerify = () => {
    if (otp === generatedOtp) {
      navigation.navigate('ResetPassword', { username });
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter the OTP sent to your registered mobile/email</Text>
      <Text style={styles.otp}>{generatedOtp}</Text> {/* show for testing */}
      <TextInput
        keyboardType="numeric"
        placeholder="Enter OTP"
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify OTP" onPress={handleVerify} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 10 },
  otp: { fontSize: 24, textAlign: 'center', color: 'blue', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 8 },
});
